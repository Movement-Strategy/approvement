userHandler = {
	userIsType : function(typeToCheck) {
		return Session.get('user_type') == typeToCheck;
	},
	onUserDataReady : function() {
		var users = Meteor.users.find({}, {fields : {profile : 1, username : 1}}).fetch();
		if(users.length > 0) {
			var user = users[0];
			this.configureCurrentUser(user);
		}
	},
	getName : function() {
		return Session.get('user_name');
	},
	userSignedIn : function() {
		return Meteor.userId() != null;
	},
	getPicture : function() {
		return Session.get('user_picture');
	},
	configureCurrentUser : function(user) {
		Session.set('user_login', user.username);
		var profile = user.profile;
		this.configureUserProfile(profile);
		progressBarHandler.setCountsForProgressBar();
		clientHandler.setCurrentClients(profile);
	},
	configureUserProfile : function(profile) {
		Session.set('user_type', profile.user_type);
		Session.set('user_name', profile.name);
		Session.set('user_picture', facebookHandler.getPictureURL(profile.facebook_id));
	},
	initializeUserDropdown : function() {
		Meteor.defer(function(){
			$('.user-image-container').dropdown();
		});
	},
	signUserOut : function() {
		Meteor.logout();
		Session.set('clients_are_ready', false);
	}
	
};