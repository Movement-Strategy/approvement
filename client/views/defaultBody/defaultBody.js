Template['defaultBody'].helpers({
	page_is_ready : function() {
		return pageLoadHandler.pageIsReady();
	},
	logged_in : function() {
		return loginHandler.isLoggedIn();
	},
	show_gif : function() {
		if(!userHandler.userIsType('client')) {
			return Session.get('show_gif');
		} else {
			return false;
		}
	}
});

Template['defaultBody'].events({
});

