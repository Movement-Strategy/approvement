clientHandler = {
	onClientsReady : function() {
		this.setClientsByID();
	},
	setClientsByID : function() {
		var clients = Client.find().fetch();
		var clientsByID = {};
		_.map(clients, function(client){
			clientsByID[client._id] = client;
		});
		Session.set('clients_by_id', clientsByID);	
	},
	getClientName : function() {
		return Session.get('selected_client').display_name;
	},
	getSelectedClientID : function() {
		return Session.get('selected_client_id');
	},
	getTwitterProfileName : function() {
		return Session.get('selected_client').twitter_profile_name;
	},
	setSelectedClient : function(){
		Deps.autorun(function(){
			if(Session.get('clients_are_ready')) {
				var clientID = Session.get('selected_client_id');
				clientHandler.setUsersToNotifyForClient();
				var clientsByID = Session.get('clients_by_id');
				Session.set('selected_client', clientsByID[clientID]);
			}
		});
	},
	setUsersToNotifyForClient : function() {
		var userNames  = Session.get('selected_client').users_to_notify;
		
		// remove the current user from users to notify
		// sane users rarely need to notify themselves
		userNames = _.filter(userNames, function(userName){
			return userName != Session.get('user_login');
		});
		
		Meteor.call('getUsersToNotify', Session.get('selected_client_id'), userNames, function(error, usersToNotify){
			Session.set('users_to_notify', usersToNotify);
		});	
	},
	getUsersToNotify : function() {
		return Session.get('users_to_notify');
	},
	onChangeClientDropdown : function(event) {
		Session.set('there_were_pending_items', false);
		Session.set('selected_client_id', event.target.value);
	},
	clientDropdownShouldBeShown : function() {
		return !Session.get('details_shown') && Session.get('current_clients').length > 1;
	},
	getClientsForDropdown : function() {
		var clientsByID = Session.get('clients_by_id');
		var clients = Session.get('current_clients');
		clients = _.map(clients, function(clientID){
			clientDetails = clientsByID[clientID];
			return {
				value : clientID,
				display : clientDetails['display_name'],
			};
		});
		return clients;
	},
	handleSingleClient : function() {
		var clients = Session.get('current_clients');
		if(clients.length == 1) {
			Session.set('selected_client_id', clients[0]);
		} 
	},
	getSelectedClientName : function() {
		var selectedClient = Session.get('selected_client');
		var clientName = Session.get('clients_are_ready') ? selectedClient.display_name : 'Client';
		return clientName;
	},
	initializeClientDropdown : function() {
		if(Session.get('clients_are_ready')) {
			Meteor.defer(function(){
				$('.client-dropdown').dropdown();
			});
		}
	},
	setCurrentClients : function(profile) {
		clients = this.getClientsFromProfile(profile);
		Session.set('current_clients', clients);
		clientHandler.handleSingleClient();
		this.setClientsAsReady(clients);
	},
	getClientsFromProfile : function(profile) {
		var clients = _.has(profile, 'clients') ? profile.clients : ['usa_today'];
		clients = clients == 'all' ? _.keys(Session.get('clients_by_id')) : clients;
		return clients;
	},
	setClientsAsReady : function(clients) {
		if(!Session.get('clients_are_ready')) {
			var selectedClientID = Session.get('selected_client_id');
			if(Session.get('clients_by_id') != {}) {
				if(selectedClientID == null) {
					Router.go('/client/' + clients[0] + '/week/' + timeHandler.getCurrentWeek());
				}
				clientHandler.setSelectedClient();
				Session.set('clients_are_ready', true);
			}
			
			
		}
	}
};