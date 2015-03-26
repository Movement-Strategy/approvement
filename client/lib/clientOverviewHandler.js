clientOverviewHandler = {
	getProcessedRows : function() {
		var approvalItemsByClient = Session.get('approval_items_by_client');
		var rows = _.map(approvalItemsByClient, function(approvalItems, clientID){
			var valuesForColumns = clientOverviewHandler.getValuesForColumns(clientID, approvalItems);
			var columns = _.map(clientOverviewHandler.getColumnMap(), function(columnDetails, columnID){
				var columnValue = _.has(valuesForColumns, columnID) ? valuesForColumns[columnID] : null;
				return clientOverviewHandler.getProcessedColumn(columnDetails, columnID , columnValue, clientID);	
			});
			return {
				columns : columns,
			};
		});
		rows = this.sortRowsByColumnValue(rows, 'needs_action');
		return rows;
	},
	getColumnMap : function() {
		var map = {
			name : {
				header_text : 'Client',
				cell_template : 'clientNameCell',
			},
			needs_action : {
				header_text : 'Needs Action',
				cell_template : 'metricCell',
				color : 'black',
				count_item : function(item) {
					return pendingItemHandler.itemIsPending(item);
				},
			},
			approved : {
				header_text : 'Client Approved',
				cell_template : 'metricCell',
				color : 'green',
				count_item : function(item) {
					return item.status == 'approved' && item.scope == 'external';
				},
			},
			denied : {
				header_text : 'Client Denied',
				cell_template : 'metricCell',
				color : 'red',
				count_item : function(item) {
					return item.scope == 'external' && item.status == 'rejected';
				},
			},
			client_submitted : {
				header_text : 'Needs Client Approval',
				cell_template : 'metricCell',
				color : 'teal',
				count_item : function(item) {
					return item.scope == 'external' && item.status == 'submitted';
				},
			},
			client_commented : {
				header_text : 'Needs Update',
				cell_template : 'metricCell',
				color : 'purple',
				count_item : function(item) {
					return item.scope == 'external' && item.status == 'commented';
				},
			},
			internal_submitted : {
				header_text : 'Needs Internal Approval',
				cell_template : 'metricCell',
				color : 'orange',
				count_item : function(item) {
					return item.scope == 'internal' && item.status == 'submitted';
				},
			},
			private :  {
				header_text : 'Needs Submission',
				cell_template : 'metricCell',
				color : 'grey',
				count_item : function(item) {
					return item.scope == 'private';
				},
			},
		};
		return jQuery.extend(true, {}, map);
	},
	getValuesForColumns : function(clientID, approvalItems) {
		var valuesForColumns = {};
		_.map(approvalItems, function(item){
			_.map(clientOverviewHandler.getColumnMap(), function(columnDetails, columnID){
				if(!_.has(valuesForColumns, columnID)) {
					valuesForColumns[columnID] = 0;
				}
				if(_.has(columnDetails, 'count_item')) {
					if(columnDetails['count_item'](item)) {
						valuesForColumns[columnID] = valuesForColumns[columnID] + 1;
					}
				}
			});
		});
		return valuesForColumns;
	},
	sortRowsByColumnValue : function(rows, sortOn) {
		return _.sortBy(rows, function(row){
			var sortColumn = _.find(row['columns'], function(column){
				return column['column_id'] == sortOn;
			});
			return sortColumn['column_data']['value'] * -1;
		});
	},
	getHeaders : function() {
		return _.map(this.getColumnMap(), function(column, columnID){
			return {
				text : column.header_text,
			};
		});
	},
	getHeaderText : function() {
		var currentWeek = timeHandler.getWeekForSelectedTime();
		return "Client Overview for " + currentWeek;	
	},
	getProcessedColumn : function(columnDetails, columnID , columnValue, clientID) {
		var templateMap = this.getTemplateMap();
		var columnData =  templateMap[columnDetails['cell_template']](columnDetails, columnValue, clientID);
		return {
			cell_template : columnDetails.cell_template,
			column_data : columnData,
			column_id : columnID,
		};
	},
	renderNameCell : function(columnDetails, valueForColumn, clientID) {
		var clientName = clientHandler.getClientNameFromID(clientID);
		var clientImage = clientHandler.getClientImageFromID(clientID);
		return {
			image : clientImage,
			name : clientName,
			client_id : clientID,
		};
	},
	onCellClick : function(context) {
		var clientID = context.client_id;
		navHandler.go('content_calendar', {client_id : clientID});	
	},
	getTemplateMap : function() {
		var map = {
			metricCell : function(columnDetails, columnValue, clientID) {
				return {
					icon_color : columnDetails.color,
					value : columnValue,
				};
			},
			clientNameCell : function(columnDetails, valueForColumn, clientID) {
				return clientOverviewHandler.renderNameCell(columnDetails, valueForColumn, clientID);
			},
			showNameCell : function(columnDetails, valueForColumn, clientID) {
				return clientOverviewHandler.renderNameCell(columnDetails, valueForColumn, clientID);
			},
		};
		return jQuery.extend(true, {}, map); 	
	},
};