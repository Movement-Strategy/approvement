userHandler = {
	isLoggedIn : function() {
		return Meteor.userId() != null;
	}
};