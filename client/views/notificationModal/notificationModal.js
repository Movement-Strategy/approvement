Template['notificationModal'].helpers({
	users_to_notify : function() {
		notificationModalHandler.initializeCheckboxes();
		return _.map(clientHandler.getUsersToNotify(), function(user, userName){
			return user;
		});
	},
	initializeTextArea : function() {
		Meteor.defer(function(){
			$('textarea.custom-notification').autosize();
		});
	}
});

Template['notificationModal'].events({
	'click .send.button' : function(event, template) {
		notificationModalHandler.onClickSend(template);
	}
});

