Template['defaultBody'].helpers({
	page_is_ready : function() {
		return pageLoadHandler.pageIsReady();
	},
	logged_in : function() {
		return loginHandler.isLoggedIn();
	},
	show_gif : function() {
		return gifHandler.gifShouldBeShown();
	},
	initializeModal : function() {
		notificationModalHandler.initializeModal();
	}
});

Template['defaultBody'].events({
});

