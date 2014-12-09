Template['mainNav'].helpers({
	show_dropdown : function() {
		return clientHandler.clientDropdownShouldBeShown();
	},
	user_picture : function() {
		return userHandler.getPicture();
	},
	is_manager : function() {
		return userHandler.userIsType('social_media_manager');	
	},
	signed_in : function() {
		return userHandler.userSignedIn();
	},
	initializeDropdown : function() {
		userHandler.initializeUserDropdown();
	},
});

Template['mainNav'].events({
	'click .sign-out' : function() {
		userHandler.signUserOut();
	},
	'click .main-title' : function() {
		if(Session.get('details_shown')) {
			detailsHandler.hideDetails();
		}
	},
});

