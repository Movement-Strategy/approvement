Template['notificationModal'].helpers({
	initializeCheckboxes : function() {
		Meteor.defer(function(){
		$('.notification-check').checkbox();
		});
	},
	users_to_notify : function() {
		return clientHandler.getUsersToNotify();
	}
});

Template['notificationModal'].events({
	'click .send.button' : function(event, template) {
		notificationModalHandler.onClickSend(template);
	}
});

