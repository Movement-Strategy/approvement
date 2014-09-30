Template['notificationModal'].helpers({
	initializeCheckboxes : function() {
		Meteor.defer(function(){
		$('.notification-check').checkbox();
		});
	}
});

Template['notificationModal'].events({
	'click .send.button' : function(event, template) {
		notificationModalHandler.onClickSend(template);
	}
});

