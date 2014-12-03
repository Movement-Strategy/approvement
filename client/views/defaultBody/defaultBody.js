Template['defaultBody'].helpers({
	page_is_ready : function() {
		return pageLoadHandler.pageIsReady();
	},
	logged_in : function() {
		return loginHandler.isLoggedIn();
	},
});

Template['defaultBody'].events({
});

