loginHandler = {
	isLoggedIn : function() {
		return Meteor.userId() != null;
	},
	changeToKeyMode : function() {
		keyStrokeHandler.setKeyMode('window', 'login');	
	},
	attemptLogin : function() {
		if(!Session.get('logging_in')) {
			var userName = $('.username-input').val();
			var password = $('.password-input').val();
			Session.set('logging_in', true);
			var onLogin = function(error) {
				Session.set('logging_in', false);
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
		}
	},
	hasError : function() {
		return Session.get('has_error');
	},
	getErrorMessage : function() {
		return Session.get('login_error');
	}
};