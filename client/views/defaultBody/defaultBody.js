Template['defaultBody'].helpers({
	page_is_ready : function() {
		return Session.get('page_is_ready');
	},
	logged_in : function() {
		return Meteor.userId() != null;
	}
});

Template['defaultBody'].events({
});

