confirmPageIsReady = function() {
	Deps.autorun(function(){
		if(Session.get('approval_items_are_ready') && Session.get('clients_are_ready')) {
			Session.set('page_is_ready', true);
		}
	});
}

Meteor.subscribe('userData', onReady = function(){
	var users = Meteor.users.find({}, {fields : {user_type : 1, clients : 1}}).fetch();
	console.log(users);
	var clients = _.has(users[0], 'clients') ? users[0].clients : ['usa_today'];
	Session.set('user_type', users[0].user_type);
	Session.set('current_clients', clients);
	var clientsByID = Session.get('clients_by_id');
	if(!Session.get('clients_are_ready')) {
		if(clientsByID != {}) {
			Session.set('selected_client_id', clients[0]);
			setSelectedClient();
			Session.set('clients_are_ready', true);
		}
	}
});