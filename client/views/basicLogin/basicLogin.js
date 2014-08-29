Template['basicLogin'].helpers({
});

Template['basicLogin'].events({
	'click .login.button' : function() {
		var userName = $('.username-input').val();
		var password = $('.password-input').val();
		var onLogin = function(error) {
			console.log(error);
		};
		var params = {
			user : {
				username : userName,
			},
			password : password,
		};
		Meteor.loginWithPassword(userName, password);
	}
});

