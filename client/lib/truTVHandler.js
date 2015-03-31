truTVHandler = {
	getShowMap : function() {
		return {
			impractical_jokers : {
				name : 'Impractical Jokers',
				profile : 'impracticaljokers',
				twitter_profile : 'truTVjokers',
			},
			hack_my_life : {
				name : 'Hack My Life',
				profile : 'truTVHackMyLife',
				twitter_profile : 'truTV',
			},
			breaking_greenville : {
				name : 'Breaking Greenville',
				profile : 'trutvbreakinggreenville',
				twitter_profile : 'truTV',
			},
			carbonaro_effect : {
				name : 'The Carbonaro Effect',
				profile : 'carbonaroeffect',
				twitter_profile : 'truTV',
			},
			friends_of_the_people : {
				 name : 'Friends of the People',
				 profile : 'truTVFOTP',
				 twitter_profile : 'truTVFOTP',
			},
			tru_tv : {
				 name : 'TruTV',
				 profile : 'truTV',
				 twitter_profile : 'truTV',
			},
			way_out_west : {
				 name : 'Way Out West',
				 profile : 'truTVWOW',
				 twitter_profile : 'truTV',
			},
			fake_off : {
				 name : 'Fake Off',
				 profile : 'truTVFakeOff',
				 twitter_profile : 'truTV',
			},
		};	
	},
	getMetricMap : function() {
		return {
			approved : {
				'check_item' : function(item) {
					return item.scope == 'external' && item.status == 'approved';
				},
				color : 'green',
			},
			rejected : {
				'check_item' : function(item) {
					return item.scope == 'external' && item.status == 'rejected';
				},
				color : 'red',
			},
			submitted : {
				'check_item' : function(item) {
					var isRightStatus = item.status == 'commented' || item.status == 'submitted';
					return item.scope == 'external' && isRightStatus;
				},
				color : 'grey',
			},
			created : {
				'check_item' : function(item) {
					return item.scope == 'private' || item.scope == 'internal';
				},
				color : 'purple',
			},
		};
	},
	getColumnMap : function() {
		return {
			name : {
				row_type : 'primary',
				header_text : 'Show',
				cell_template : 'showNameCell',
				get_data : function(params) {
					var showID = params['show_id'];
					return {
						image : truTVHandler.getProfileImageURLForShowID(showID),
						name : truTVHandler.getShowNameFromShowID(showID),
					};	
				},
			},
			network : {
				row_type : 'secondary',
				header_text : 'Network',
				cell_template : 'networkIconCell',
				get_data : function(params) {
					var iconMap = truTVHandler.getIconMap();
					return {
						icon : iconMap[params['network_type']],
					};
				},
			},
			approved : {
				header_text : 'Approved',
				row_type : 'secondary',
				cell_template : 'metricCell',
				get_data : function(params) {
					return truTVHandler.getProcessedMetric('approved', params);
				},
			},
			rejected : {
				header_text : 'Rejected',
				row_type : 'secondary',
				cell_template : 'metricCell',
				get_data : function(params) {
					return truTVHandler.getProcessedMetric('rejected', params);
				},
			},
			submitted : {
				header_text : 'Submitted',
				row_type : 'secondary',
				cell_template : 'metricCell',
				get_data : function(params) {
					return truTVHandler.getProcessedMetric('submitted', params);
				},
			},
			created : {
				header_text : 'Created',
				row_type : 'secondary',
				cell_template : 'metricCell',
				get_data : function(params) {
					return truTVHandler.getProcessedMetric('created', params);
				},
			},
			
		};	
	},
	getColumnHeaders : function() {
		return _.map(this.getColumnMap(), function(column, columnID){
			return {
				text : column.header_text,
			};
		});
	},
	getCellOptions : function() {
		return _.map(this.getShowMap(), function(showDetails, showName){
			return {
				value : showName,
				display : showDetails['name'],
			};
		});
	},
	getShowOptions : function() {
		var showMap = this.getShowMap();
		return _.map(showMap, function(details, showID){
			return {
				name : details.name,
				value : showID,
			};
		});
	},
	getHeaderText : function() {
		var currentWeek = timeHandler.getWeekForSelectedTime();
		return "Show overview for " + currentWeek;	
	},
	getProcessedMetric : function(metricName, params) {
		var metricMap = this.getMetricMap();
		var metrics = params['metrics'];
		var value = metrics[metricName];
		var iconColor = metricMap[metricName]['color'];
		return {
			value : value,
			icon_color : iconColor,
		};
	},
	getOverviewRows : function() {
		var approvalMetricsByShowByNetwork = this.getApprovalMetricsByShowByNetwork();
		return this.getProcessedShowRows(approvalMetricsByShowByNetwork);
	},
	getIconMap : function() {
		return {
			facebook : 'facebook',
			twitter : 'twitter',
			linked : 'linkedin',
			instagram : 'instagram',
		};
	},
	getApprovalMetricsByShowByNetwork : function() {
		var approvalItems = this.getAllApprovalItemsFromCalendarDays();
		var metricsByShowByNetwork = {};
		_.map(approvalItems, function(approvalItem){
			var networkType = approvalItem.type;
			var showID = approvalItem.show;
			if(!_.has(metricsByShowByNetwork, showID)) {
				metricsByShowByNetwork[showID] = {};
			}
			if(!_.has(metricsByShowByNetwork[showID], networkType)) {
				metricsByShowByNetwork[showID][networkType] = {};
			}
			_.map(truTVHandler.getMetricMap(), function(metricDetails, metricName){
				if(!_.has(metricsByShowByNetwork[showID][networkType], metricName)) {
					metricsByShowByNetwork[showID][networkType][metricName] = 0;
				}
				
				if(metricDetails['check_item'](approvalItem)) {
					metricsByShowByNetwork[showID][networkType][metricName] =  metricsByShowByNetwork[showID][networkType][metricName] + 1; 
				}
			});
		});
		
		return metricsByShowByNetwork;
	},
	getProcessedColumn : function(rowType, columnID, columnDetails, params) {
		
		var columnData = {};
		var cellTemplate = 'emptyCell';
		
		if(rowType == columnDetails['row_type']) {
			var columnData = columnDetails['get_data'](params);
			var cellTemplate = columnDetails['cell_template'];
		}
		
 		return {
			cell_template : cellTemplate,
			column_data : columnData,
		};
	},
	getProcessedShowRows : function(approvalMetricsByShowByNetwork) {
		var rows = [];
		_.map(approvalMetricsByShowByNetwork, function(metricsByNetwork, showID){
			rows = truTVHandler.addRowForShowName(rows, showID);
			rows = truTVHandler.addRowsForAllNetworks(rows, showID, metricsByNetwork);
		});
		return rows;
	},
	addRowForShowName : function(rows, showID) {
		var columns = _.map(this.getColumnMap(), function(columnDetails, columnID){
			var params = {
				show_id : showID,
			};
			return truTVHandler.getProcessedColumn('primary', columnID, columnDetails, params);
		});
		var row = {
			columns : columns,
			highlighted : true,
		};
		rows.push(row);
		return rows;
	},
	addRowsForAllNetworks : function(rows, showID, metricsByNetwork) {
		_.map(metricsByNetwork, function(metrics, networkType){
			rows = truTVHandler.addRowForNetwork(rows, showID, networkType, metrics);
		});
		return rows;
	},
	addRowForNetwork : function(rows, showID, networkType, metrics) {
		var columns = _.map(this.getColumnMap(), function(columnDetails, columnID){
			var params = {
				network_type : networkType,
				metrics : metrics,
				show_id : showID,
			};
			return truTVHandler.getProcessedColumn('secondary', columnID, columnDetails, params);
		});
		var row = {
			columns : columns,
			highlighted : false,
		};
		rows.push(row);
		return rows;	
	},
	getAllApprovalItemsFromCalendarDays : function() {
		return _.chain(Session.get('calendar_days'))
			.pluck('approval_items')
			.compact()
			.map(function(itemsForDay){
				return _.flatten(itemsForDay);
			})
			.flatten()
		.value();	
	},
	setShowInItem : function(item){
		item['show'] = Session.get('current_show_id');
		return item;
	},
	onShowDetails : function(params){
		if(!params.is_creating_new) {
			Session.set('current_show_id', params.item.show);
		}
	},
	getProfileImage : function(){
		return this.getKeyForCurrentShow('profile');
	},
	getProfileImageURLForShowID : function(showID) {
		var profileImage = this.getKeyFromMap('profile', showID);
		return facebookHandler.getPictureURL(profileImage);		
	},
	getClientName : function(){
		return this.getKeyForCurrentShow('name');
	},
	getPopupTitle : function(item) {
		var showName = this.getShowName(item);
		var profileImage = this.getKeyFromItem('profile', item);
		var imageURL = facebookHandler.getPictureURL(profileImage);
		var fullTitle = '<img src="' + imageURL + '" class="ui avatar image">' + showName;
		return fullTitle;
	},
	getTwitterProfile : function(){
		return this.getKeyForCurrentShow('twitter_profile');
	},
	getShowName : function(item) {
		return this.getKeyFromItem('name', item);
	},
	getShowNameFromShowID : function(showID) {
		return this.getKeyFromMap('name', showID);	
	},
	getKeyForCurrentShow : function(key){
		return this.getKeyFromMap(key, Session.get('current_show_id'));
	},
	getKeyFromItem : function(key, item) {
		var value = null;
		if(item) {
			var showID = item.show;
			value = this.getKeyFromMap(key, showID);
		}
		return value;
	},
	getKeyFromMap : function(key, showID) {
		var value = null;
		var showMap = this.getShowMap();
		if(_.has(showMap, showID)) {
			value = showMap[showID][key];
		}
		return value;
	},
	
};