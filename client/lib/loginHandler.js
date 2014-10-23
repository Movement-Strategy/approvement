loginHandler = {
	isLoggedIn : function() {
		return Meteor.userId() != null;
	},
	attemptLogin : function() {
		var userName = $('.username-input').val();
		var password = $('.password-input').val();
		var onLogin = function(error) {
			// set the session variable to be used by the view if theres
			// an error message returned
			if(error != null) {
				Session.set('login_error', error.reason);
			} else {
				Session.set('login_error', null);
				Router.go('/');
			}
			
		};
		Meteor.loginWithPassword(userName, password, onLogin);
		
	},
	triggerLoginOnEnterPress : function(event){
		if(event.which == 13) {
			this.attemptLogin();
		}
	},
	hasError : function() {
		return Session.get('has_error');
	},
	getErrorMessage : function() {
		return Session.get('login_error');
	}
};