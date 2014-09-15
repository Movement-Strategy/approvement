Template['defaultBody'].helpers({
	page_is_ready : function() {
		return pageLoadHandler.pageIsReady();
	},
	logged_in : function() {
		return userHandler.isLoggedIn();
	}
});

Template['defaultBody'].events({
});

