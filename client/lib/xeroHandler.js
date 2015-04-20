xeroHandler = {
	getRegionMap : function() {
		var map =  {
			us : {
				name : 'US',
				image : 'http://s3.amazonaws.com/approval.images/subfolder/12d75814-5f32-4ff4-97e5-89754c8254df.png',
			},
			uk : {
				name : 'UK',
				image : 'http://s3.amazonaws.com/approval.images/subfolder/22295ac6-6f53-4687-9de4-b372d7affd97.JPG',
			},
		};
		return jQuery.extend(true, {}, map);
	},
	getChannelMap : function() {
		var map =  {
			baseline : {
				name : "Baseline",
			},
			direct : {
				name : 'Direct',
			},
			partner : {
				name : 'Partner',
			},
		};
		return jQuery.extend(true, {}, map);
	},
	getColumnMap : function() {
		return {
			region : {
				row_type : 'primary',
				header_text : 'Region',
				cell_template : 'showNameCell',
				get_data : function(params) {
					var regionID = params['region_id'];
					var name =  xeroHandler.getRegionNameFromID(regionID);
					var image = xeroHandler.getRegionImageFromID(regionID);
					return {
						name : name,
						image : image,
					};
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
	getRegionNameFromID : function(regionID) {
		var regionMap = this.getRegionMap();
		return regionMap[regionID]['name'];
	},
	getRegionImageFromID : function(regionID) {
		var regionMap = this.getRegionMap();
		return regionMap[regionID]['image'];
	},
	getApprovalMetricsByRegionByChannelByNetwork : function() {
		var approvalItems = truTVHandler.getAllApprovalItemsFromCalendarDays();
		var metricsByRegionByChannelByNetwork = {};
		_.map(approvalItems, function(approvalItem){
			var networkType = approvalItem.type;
			var regionID = approvalItem.region_id;
			var channelID = approvalItem.channel_id;

			if(!_.has(metricsByRegionByChannelByNetwork, regionID)) {
				metricsByRegionByChannelByNetwork[regionID] = {};
			}
			if(!_.has(metricsByRegionByChannelByNetwork[regionID], channelID)) {
				metricsByRegionByChannelByNetwork[regionID][channelID] = {};
			}
			if(!_.has(metricsByRegionByChannelByNetwork[regionID][channelID], networkType)) {
				metricsByRegionByChannelByNetwork[regionID][channelID][networkType] = {};
			}
			
			_.map(truTVHandler.getMetricMap(), function(metricDetails, metricName){
				if(!_.has(metricsByRegionByChannelByNetwork[regionID][channelID][networkType], metricName)) {
					metricsByRegionByChannelByNetwork[regionID][channelID][networkType][metricName] = 0;
				}
				if(metricDetails['check_item'](approvalItem)) {
					metricsByRegionByChannelByNetwork[regionID][channelID][networkType][metricName] =  metricsByRegionByChannelByNetwork[regionID][channelID][networkType][metricName] + 1; 
				}
			});
		});
		
		return metricsByRegionByChannelByNetwork;
	},
	getOverviewRows : function() {
		var metricsByRegionByChannelByNetwork = this.getApprovalMetricsByRegionByChannelByNetwork();
		return this.getProcessedRegionRows(metricsByRegionByChannelByNetwork);
	},
	getProcessedRegionRows : function(metricsByRegionByChannelByNetwork) {
		var rows = [];
		_.map(metricsByRegionByChannelByNetwork, function(metricsByRegion, regionID){
			rows = xeroHandler.addRowForRegion(rows, regionID);
		});
		return rows;
	},
	addRowForRegion : function(rows, regionID) {
		var columns = _.map(this.getColumnMap(), function(columnDetails, columnID){
			var params = {
				region_id : regionID,
			};
			return xeroHandler.getProcessedColumn('primary', columnID, columnDetails, params);
		});
		var row = {
			columns : columns,
			highlighted : true,
		};
		rows.push(row);
		return rows;
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
	
	getRegionOptions : function() {
		var regionMap = this.getRegionMap();
		return this.convertMapIntoOptions(regionMap);
	},
	getChannelOptions : function() {
		var channelMap = this.getChannelMap();
		return this.convertMapIntoOptions(channelMap);
	},
	convertMapIntoOptions : function(map) {
		return _.map(map, function(details, id){
			return {
				name : details['name'],
				id : id,
			};
		});
	},
	setRegionAndChannelInItem : function(item) {
		item['region_id'] = Session.get('current_region_id');
		item['channel_id'] = Session.get('current_channel_id');
		return item;	
	},
	getPopupTitle : function(item) {
		return item['region_id'] + ":" + item['channel_id'];
	},
};