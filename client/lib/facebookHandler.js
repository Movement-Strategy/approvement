facebookHandler = {
	getProfilePictureURL : function() {
		var profileName = Session.get('selected_client').facebook_profile_name;
		return this.getPictureURL(profileName);
	},
	getPictureURL : function(id) {	
		return 'http://graph.facebook.com/' + id + '/picture?size=square';
	},
};