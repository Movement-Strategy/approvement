truTVHandler = {
	getShowMap : function() {
		return {
			hack_my_life : {
				name : 'Hack My LIfe',
				profile : 'truTVHackMyLife',
				twitter_profile : 'trutv',
			},
			impractical_jokers : {
				name : 'Impractical Jokers',
				profile : 'impracticaljokers',
				twitter_profile : 'trutvjokers',
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
	getClientName : function(){
		return this.getKeyForCurrentShow('name');
	},
	getPopupTitle : function(item) {
		var showName = this.getShowName(item);
		var profileImage = this.getKeyFromItem('profile', item);
		var imageURL = facebookHandler.getPictureURL(profileImage);
		var fullTitle = '<img src="' + imageURL + '" class="ui avatar image">' + showName;
		console.log(fullTitle);
		return fullTitle;
	},
	getTwitterProfile : function(){
		return this.getKeyForCurrentShow('twitter_profile');
	},
	getShowName : function(item) {
		return this.getKeyFromItem('name', item);
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