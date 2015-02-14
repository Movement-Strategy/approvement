truTVHandler = {
	getShowMap : function() {
		return {
			impractical_jokers : {
				name : 'Impractical Jokers',
				profile : 'impracticaljokers',
				twitter_profile : 'truTVjokers',
			},
			hack_my_life : {
				name : 'Hack My LIfe',
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
					return item.scope == 'internal';
				},
				color : 'grey',
			},
			in_pipeline : {
				'check_item' : function(item) {
					return item.scope == 'private';
				},
				color : 'purple',
			},
		};
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
	getSummarizedShows : function() {
		var approvalMetricsByShowByNetwork = this.getApprovalMetricsByShowByNetwork();
		return _.map(approvalMetricsByShowByNetwork, function(metricsByNetwork, showID){
			var processedNetworks = truTVHandler.getProcessedNetworks(metricsByNetwork);
			var profileImageURL = truTVHandler.getProfileImageURLForShowID(showID);
			var showName = truTVHandler.getShowNameFromShowID(showID);
			return {
				show_id : showID,
				name : showName,
				image : profileImageURL,
				networks : processedNetworks,
			}
		});
	},
	getIconMap : function() {
		return {
			facebook : 'facebook',
			twitter : 'twitter',
			linked : 'linkedin',
			instagram : 'instagram',
		};
	},
	getProcessedNetworks : function(metricsByNetwork){
		// iterate over the icon map so we can make sure the networks are always in same order
		return _.chain(this.getIconMap())
			.map(function(icon, networkType){
				if(_.has(metricsByNetwork, networkType)){
					var processedMetrics = truTVHandler.getProcessedMetrics(metricsByNetwork[networkType]);
					return {
						icon : icon,
						metrics : processedMetrics,
					};
				}
			})
			.compact()
		.value();
	},
	getProcessedMetrics : function(metrics){
		var metricMap = truTVHandler.getMetricMap();
		return _.map(metrics, function(value, metricName){
			var color = metricMap[metricName]['color'];
			return {
				icon_color : color,
				value : value,
			};
		});
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