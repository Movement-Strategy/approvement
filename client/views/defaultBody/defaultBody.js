Template['defaultBody'].helpers({
	approval_items_are_ready : function() {
		return Session.get('approval_items_are_ready');
	},
	logged_in : function() {
		return Meteor.userId() != null;
	}
});

Template['defaultBody'].events({
});

