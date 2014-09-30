Template['notificationModal'].helpers({
	initializeCheckboxes : function() {
	},
	users_to_notify : function() {
		notificationModalHandler.initializeCheckboxes();
		return _.map(clientHandler.getUsersToNotify(), function(user, userName){
			return user;
		});
	}
});

Template['notificationModal'].events({
	'click .send.button' : function(event, template) {
		notificationModalHandler.onClickSend(template);
	}
});

