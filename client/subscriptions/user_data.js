Meteor.subscribe('userData', onReady = function(){
	Deps.autorun(function(){
		var users = Meteor.users.find({}, {fields : {profile : 1}}).fetch();
		if(users.length > 0) {
			var user = users[0];
			var profile = user.profile;
			Session.set('user_type', profile.user_type);
			pendingItemHandler.setCountsForProgressBar();
			var clients = _.has(user.profile, 'clients') ? user.profile.clients : ['usa_today'];
			var clientsByID = Session.get('clients_by_id');
			clients = clients == 'all' ? _.keys(clientsByID) : clients;
			Session.set('current_clients', clients);
			Session.set('user_name', profile.name);
			Session.set('user_picture', facebookHandler.getPictureURL(profile.facebook_id));
			if(!Session.get('clients_are_ready')) {
				if(clientsByID != {}) {
					Session.set('selected_client_id', clients[0]);
					setSelectedClient();
					Session.set('clients_are_ready', true);
				}
			}
		}
	});
});
