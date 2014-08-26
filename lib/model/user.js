if(Meteor.isServer) {
	Meteor.methods({
		setUserType : function(id, type) {
			Meteor.users.update(id, {$set : {user_type : type}});
		},
		setClientsForUser : function(id, clients) {
			Meteor.users.update(id, {$set : {clients : clients}});
		},
		configureUser : function(id, clients, type) {
			Meteor.users.update(id, {$set : {
				clients : clients,
				user_type : type,
			}});
		},
		eraseUser : function(id) {
			Meteor.users.remove(id);
		}
	});
}