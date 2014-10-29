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
	show_draft_board : function() {
		return draftBoardHandler.isShown();
	},
	initializeModal : function() {
		notificationModalHandler.initializeModal();
	}
});

Template['defaultBody'].events({
});

