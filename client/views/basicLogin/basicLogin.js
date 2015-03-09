Template['basicLogin'].helpers({
	has_error : function() {
		return loginHandler.hasError();
	},
	error_message : function() {
		return loginHandler.getErrorMessage();
	}
});

Template['basicLogin'].events({
	'click .login.button' : function() {
		loginHandler.attemptLogin();
	}
});

keyStrokeHandler.types('window', {
	login : {
		on_enter_down : function() {
			loginHandler.attemptLogin();	
		},
	},
});

