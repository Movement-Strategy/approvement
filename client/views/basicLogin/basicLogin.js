Template['basicLogin'].helpers({
	has_error : function() {
		return loginHandler.hasError();
	},
	error_message : function() {
		return loginHandler.getErrorMessage();
	}
});

Template['basicLogin'].events({
	'keydown .password-input' : function(event) {
		loginHandler.triggerLoginOnEnterPress(event);
	},
	'keydown .login-input' : function(event) {
		loginHandler.triggerLoginOnEnterPress(event);
	},
	'click .login.button' : function() {
		loginHandler.attemptLogin();
	}
});

