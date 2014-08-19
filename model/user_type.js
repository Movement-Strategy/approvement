if(Meteor.isServer) {
	Meteor.methods({
		setUserType : function(id, type) {
			Meteor.users.update(id, {$set : {user_type : type}});
		},
	});
}