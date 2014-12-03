Template['defaultBody'].helpers({
	page_is_ready : function() {
		return pageLoadHandler.pageIsReady();
	},
	renderTest : function() {
		console.log('notification load');	
	},
	logged_in : function() {
		return loginHandler.isLoggedIn();
	},
	initializeModal : function() {
// 		notificationModalHandler.initializeModal();
	}
});

Template['defaultBody'].events({
});

