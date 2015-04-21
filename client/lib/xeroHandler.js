xeroHandler = {
	getRegionMap : function() {
		var map =  {
			us : {
				name : 'United States',
				short_name : 'US',
				image : 'http://s3.amazonaws.com/approval.images/subfolder/12d75814-5f32-4ff4-97e5-89754c8254df.png',
			},
			uk : {
				name : 'United Kingdom',
				short_name : 'UK',
				image : 'http://s3.amazonaws.com/approval.images/subfolder/22295ac6-6f53-4687-9de4-b372d7affd97.JPG',
			},
			nz : {
				name : 'New Zealand',
				short_name : 'NZ',
				image : 'http://s3.amazonaws.com/approval.images/subfolder/334b6de6-0ea2-4030-bca7-383f38f5bdcf.png',
			},
			au : {
				name : 'Austrailia',
				short_name : 'AU',
				image : 'http://s3.amazonaws.com/approval.images/subfolder/f1a93e30-7193-4ad0-b750-b5e1fcafc01d.png',
			},

		};
		return jQuery.extend(true, {}, map);
	},
	getChannelMap : function() {
		var map =  {
			baseline : {
				name : "Baseline",
				image : 'http://s3.amazonaws.com/approval.images/subfolder/e29943f8-298c-48ba-b1aa-03bc17b6f74e.png',
			},
			direct : {
				name : 'Direct',
				image : 'http://s3.amazonaws.com/approval.images/subfolder/e297a591-9b18-46f5-8f8a-5bba95d5800b.jpeg',
			},
			partner : {
				name : 'Partner',
				image : 'http://s3.amazonaws.com/approval.images/subfolder/ff00b72e-3bde-4660-9a6e-43fb0359b518.jpg',
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
			channel : {
				row_type : 'secondary',
				header_text : 'Channel',
				cell_template : 'showNameCell',
				get_data : function(params) {
					var channelID = params['channel_id'];
					var name =  xeroHandler.getChannelNameFromID(channelID);
					var image = xeroHandler.getChannelImageFromID(channelID);
					return {
						name : name,
						image : image,
					};
				},
			},
			network : {
				row_type : 'tertiary',
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
				row_type : 'tertiary',
				cell_template : 'metricCell',
				get_data : function(params) {
					return truTVHandler.getProcessedMetric('approved', params);
				},
			},
			rejected : {
				header_text : 'Rejected',
				row_type : 'tertiary',
				cell_template : 'metricCell',
				get_data : function(params) {
					return truTVHandler.getProcessedMetric('rejected', params);
				},
			},
			submitted : {
				header_text : 'Submitted',
				row_type : 'tertiary',
				cell_template : 'metricCell',
				get_data : function(params) {
					return truTVHandler.getProcessedMetric('submitted', params);
				},
			},
			created : {
				header_text : 'Created',
				row_type : 'tertiary',
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
	
	getRegionNameFromID : function(regionID) {
		var regionMap = this.getRegionMap();
		return regionMap[regionID]['name'];
	},
	getRegionImageFromID : function(regionID) {
		var regionMap = this.getRegionMap();
		return regionMap[regionID]['image'];
	},
	getChannelNameFromID : function(channelID) {
		var channelMap = this.getChannelMap();
		return channelMap[channelID]['name'];
	},
	getChannelImageFromID : function(channelID) {
		var channelMap = this.getChannelMap();
		return channelMap[channelID]['image'];
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
		var regionMap = this.getRegionMap();
		_.map(regionMap, function(regionDetails, regionID){
			var metricsByChannelByNetwork = _.has(metricsByRegionByChannelByNetwork, regionID) ? metricsByRegionByChannelByNetwork[regionID] : {};
			rows = xeroHandler.addRowForRegion(rows, regionID);
			rows = xeroHandler.addRowsForChannels(metricsByChannelByNetwork, rows);
		});
		return rows;
	},
	getRegionCellOptions : function() {
		return _.map(this.getRegionMap(), function(regionDetails, regionID){
			return {
				value : regionID,
				display : regionDetails['short_name'],
			};
		});
	},
	getChannelCellOptions : function() {
		return _.map(this.getChannelMap(), function(channelDetails, channelID){
			return {
				value : channelID,
				display : channelDetails['name'],
			};
		});
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
	onShowDetails : function(params){
		if(!params.is_creating_new) {
			Session.set('current_region_id', params.item.region_id);
			Session.set('current_channel_id', params.item.channel_id);
		}
	},
	addRowsForChannels : function(metricsByChannelByNetwork, rows) {
		var channelMap = this.getChannelMap();
		_.map(channelMap, function(channelDetails, channelID){
			var metricsByNetwork = _.has(metricsByChannelByNetwork, channelID) ? metricsByChannelByNetwork[channelID] : {};
			var columns = _.map(xeroHandler.getColumnMap(), function(columnDetails, columnID){
				var params = {
					channel_id : channelID,
				};
				return xeroHandler.getProcessedColumn('secondary', columnID, columnDetails, params);
			});
			var row = {
				columns : columns,
				highlighted : true,
			};
			rows.push(row);
			rows = xeroHandler.addRowsForAllNetworks(rows, metricsByNetwork);
		});
		return rows;
	},
	getPopupTitle : function(item) {
		var regionID = item['region_id'];
		var channelID = item['channel_id'];
		var regionMap = this.getRegionMap();
		var channelMap = this.getChannelMap();
		var regionName = regionMap[regionID]['short_name'];
		var channelName = channelMap[channelID]['name'];
		var channelImage = channelMap[channelID]['image'];
		var fullTitle = '<img src="' + channelImage + '" class="ui avatar image">' + regionName + ": " + channelName;
		return fullTitle;
	},
	getHeaderTitle : function(item) {
		var title = "";
		var regionID = Session.get('current_region_id');
		var channelID = Session.get('current_channel_id');
		var createPrefix = "Create New ";
		var editPrefix = "Edit ";
		var regionMap = this.getRegionMap();
		var channelMap = this.getChannelMap();
		if(regionID != null && channelID != null) {
			var regionName = regionMap[regionID]['short_name'];
			var channelName = channelMap[channelID]['name'];
			var headerName = regionName + ":" + channelName + " ";
			createPrefix = createPrefix + " " + headerName;
			editPrefix = editPrefix + " " + headerName;
		}
		
		title =  detailsHandler.getTitleString(createPrefix, editPrefix);
		
		return title;
	},
	addRowsForAllNetworks : function(rows, metricsByNetwork) {
		_.map(metricsByNetwork, function(metrics, networkType){
			rows = xeroHandler.addRowForNetwork(rows, networkType, metrics);
		});
		return rows;
	},
	addRowForNetwork : function(rows, networkType, metrics) {
		var columns = _.map(this.getColumnMap(), function(columnDetails, columnID){
			var params = {
				network_type : networkType,
				metrics : metrics,
			};
			return xeroHandler.getProcessedColumn('tertiary', columnID, columnDetails, params);
		});
		var row = {
			columns : columns,
			highlighted : false,
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
		return this.convertMapIntoOptions(regionMap, 'short_name');
	},
	getChannelOptions : function() {
		var channelMap = this.getChannelMap();
		return this.convertMapIntoOptions(channelMap, 'name');
	},
	convertMapIntoOptions : function(map, nameKey) {
		return _.map(map, function(details, id){
			return {
				name : details[nameKey],
				value : id,
			};
		});
	},
	setRegionAndChannelInItem : function(item) {
		
		item['region_id'] = Session.get('current_region_id');
		item['channel_id'] = Session.get('current_channel_id');
		return item;	
	},
};