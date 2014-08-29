var attemptLogin = function() {
	var userName = $('.username-input').val();
	var password = $('.password-input').val();
	var onLogin = function(error) {
		if(error != null) {
			Session.set('login_error', error.reason);
		} else {
			Session.set('login_error', null);
		}
	};
	Meteor.loginWithPassword(userName, password, onLogin);
}

Template['basicLogin'].helpers({
	has_error : function() {
		return Session.get('login_error') != null;
	},
	error_message : function() {
		return Session.get('login_error');
	}
});

Template['basicLogin'].events({
	'keydown .password-input' : function(event) {
		if(event.which == 13) {
			attemptLogin();
		}
	},
	'keydown .login-input' : function(event) {
		if(event.which == 13) {
			attemptLogin();
		}
	},
	'click .login.button' : function() {
		attemptLogin();
	}
});

