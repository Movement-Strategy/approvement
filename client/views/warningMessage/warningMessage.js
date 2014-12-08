Template['warningMessage'].helpers({
	message_type : function() {
		return Session.get('warning_message_type');	
	},
	message : function() {
		return Session.get('warning_message');	
	},
	hidden_class : function() {
		return Session.equals('warning_message', null) ? 'hidden' : '';
	}
});

Template['warningMessage'].events({
});

