confirmPageIsReady = function() {
	Deps.autorun(function(){
		if(Session.get('approval_items_are_ready') && Session.get('clients_are_ready')) {
			Session.set('page_is_ready', true);
		}
	});
}

Meteor.subscribe('userData', onReady = function(){
	var users = Meteor.users.find({}, {fields : {user_type : 1, clients : 1, profile : 1}}).fetch();
	console.log(users);
	var user = users[0];
	var clients = _.has(user, 'clients') ? user.clients : ['usa_today'];
	Session.set('user_type', user.user_type);
	Session.set('current_clients', clients);
	Session.set('user_name', user.profile.name);
	var clientsByID = Session.get('clients_by_id');
	if(!Session.get('clients_are_ready')) {
		if(clientsByID != {}) {
			Session.set('selected_client_id', clients[0]);
			setSelectedClient();
			Session.set('clients_are_ready', true);
		}
	}
});