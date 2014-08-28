facebookHandler = {
	getProfilePictureURL : function() {
		var profileName = Session.get('selected_client').facebook_profile_name;
		return 'http://graph.facebook.com/' + profileName + '/picture?size=square';
	}
};