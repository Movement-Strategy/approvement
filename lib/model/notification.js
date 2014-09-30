if(Meteor.isServer) {
	Meteor.methods({
		sendNotificationEmail : function(to, from, subject, text) {
			this.unblock();
			Email.send({
				to : to,
				from : from,
				subject : subject,
				text : text,
			});
		},
	});
}