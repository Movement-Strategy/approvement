clientHandler = {
	getClientName : function() {
		return Session.get('selected_client').display_name;
	},
	getTwitterProfileName : function() {
		return Session.get('selected_client').twitter_profile_name;
	}
};