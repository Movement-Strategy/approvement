Meteor.subscribe('userData', onReady = function(){
	var users = Meteor.users.find({}, {fields : {user_type : 1}}).fetch();
	Session.set('user_type', users[0].user_type);
});