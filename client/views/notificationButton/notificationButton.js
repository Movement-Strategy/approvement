Template['notificationButton'].helpers({
	email_sent : function() {
		return notificationModalHandler.emailSent();	
	},
	button_class : function() {
		return notificationModalHandler.emailSent() ? 'email-sent' : '';
	}

});

Template['notificationButton'].events({
	'click' : function(event) {
		notificationModalHandler.showModal();
	},
});

