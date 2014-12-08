warningMessageHandler = {
	showMessage : function(message, messageType) {
		Session.set('warning_message', message);
		Session.set('warning_message_type', messageType);
		Meteor.setTimeout(function(){
			warningMessageHandler.resetMessage();
		}, 10 * 1000);
	},
	resetMessage : function() {
		Session.set('warning_message', null);
		Session.set('warning_message_type', null);
	},
};