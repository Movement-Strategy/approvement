Template['mainNav'].helpers({
	show_dropdown : function() {
		return clientHandler.clientDropdownShouldBeShown();
	},
	user_picture : function() {
		return userHandler.getPicture();
	},
	custom_nav_template : function() {
		return customClientHandler.getCustomNavTemplate();	
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
		if(settingsWindowHandler.isShown()) {
			settingsWindowHandler.hide();
		}
	},
});

