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
		var profileImage = null;
		var showMap = this.getShowMap();
		var showID = Session.get('current_show_id');
		if(_.has(showMap, showID)) {
			profileImage = showMap[showID]['profile'];
		}	
		return profileImage;
	},
	getClientName : function(){
		var name = null;
		var showMap = this.getShowMap();
		var showID = Session.get('current_show_id');
		if(_.has(showMap, showID)) {
			name = showMap[showID]['name'];
		}	
		return name;
	},
	getTwitterProfile : function(){
		var name = null;
		var showMap = this.getShowMap();
		var showID = Session.get('current_show_id');
		if(_.has(showMap, showID)) {
			name = showMap[showID]['twitter_profile'];
		}	
		return name;
	},
	getShowName : function(item) {
		var name = null;
		if(item) {
			var showID = item.show;
			var showMap = this.getShowMap();
			if(_.has(showMap, showID)) {
				name = showMap[showID]['name'];
			}
		}
		return name;
	},
	
};