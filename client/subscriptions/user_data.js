confirmPageIsReady = function() {
	Deps.autorun(function(){
		if(Session.get('approval_items_are_ready') && Session.get('clients_are_ready')) {
			Session.set('page_is_ready', true);
		}
	});
}

Meteor.subscribe('userData', onReady = function(){
	var users = Meteor.users.find({}, {fields : {profile : 1}}).fetch();
	var user = users[0];
	var clients = _.has(user.profile, 'clients') ? user.profile.clients : ['usa_today'];
	var profile = user.profile;
	Session.set('user_type', profile.user_type);
	Session.set('current_clients', clients);
	Session.set('user_name', profile.name);
	Session.set('user_facebook_id', profile.facebook_id);
	var clientsByID = Session.get('clients_by_id');
	if(!Session.get('clients_are_ready')) {
		if(clientsByID != {}) {
			Session.set('selected_client_id', clients[0]);
			setSelectedClient();
			Session.set('clients_are_ready', true);
		}
	}
});