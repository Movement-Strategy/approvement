clientHandler = {
	clientIsSelected : function() {
		return Session.get('selected_client_id') != null;	
	},
	setSelectedClientID : function(clientID) {
        if(clientID != clientHandler.getSelectedClientID()) {
	        Session.set('approval_items_are_ready', false);
	        Session.set('selected_client_id', clientID);
        }
	},
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
	onHomeRouteLoad : function() {
		Session.set('redirect_from_home', true);	
	},
	handleHomeRoute : function() {
		var clients = Session.get('current_clients');
		// go the first client in the client list
		if(_.size(clients) == 1 || userHandler.userIsType('client')){
			var clientID = clients[0];
			var weekID = timeHandler.getDateStringForStartOfThisWeek();
			Session.set('redirect_from_home', false);
			navHandler.go('content_calendar', {client_id : clientID, week_id : weekID});
		} else {
			navHandler.go('client_overview');
		}
	},
	getClientName : function(allowCustomization) {
		var clientName = Session.get('selected_client').display_name;
		if(allowCustomization) {
			customName = customClientHandler.getCustomClientName();
			if(customName != null) {
				clientName = customName;
			}
		}
		return clientName;
	},
	getSelectedClientID : function() {
		return Session.get('selected_client_id');
	},
	getClientNameFromID : function(clientID) {
		if(Session.get('clients_are_ready')) {
			return Session.get('clients_by_id')[clientID]['display_name'];
		} else {
			return 'None';
		}
	},
	getClientImageFromID : function(clientID) {
		if(Session.get('clients_are_ready')) {
			var profileName = Session.get('clients_by_id')[clientID]['facebook_profile_name'];
			return facebookHandler.getPictureURL(profileName);
		} else {
			return 'none';
		}
	},
	getTwitterProfileName : function() {
		var name = Session.get('selected_client').twitter_profile_name;
		var customName = customClientHandler.getCustomTwitterProfile();
		return customName ? customName : name;
	},
	setSelectedClient : function(){
		Deps.autorun(function(){
			var clientID = clientHandler.getSelectedClientID();
			if(Session.get('clients_are_ready') && clientID != null) {
				var clientsByID = Session.get('clients_by_id');
				if(_.has(clientsByID, clientID)) {
					Session.set('selected_client', clientsByID[clientID]);
				} else {
					Router.go('/login');
				}
				
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
		
		Meteor.call('getUsersToNotify', clientHandler.getSelectedClientID(), userNames, function(error, usersToNotify){
			Session.set('users_to_notify', usersToNotify);
		});	
	},
	getUsersToNotify : function() {
		return Session.get('users_to_notify');
	},
	onChangeClientDropdown : function(event) {
		Session.set('there_were_pending_items', false);
		var weekID = timeHandler.getWeekForSelectedTime();
		var clientID = event.target.value;
		var routeToNavigateTo = navHandler.getCurrentRoute();
		if(clientID != 'tru_tv' && routeToNavigateTo == 'show_overview') {
			routeToNavigateTo = 'content_calendar';
		}
		navHandler.go(routeToNavigateTo, {client_id : clientID});
	},
	clientDropdownShouldBeShown : function() {
		return !detailsHandler.detailsShown() && Session.get('current_clients').length > 1 && !navHandler.isOnRoute('client_overview');
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
	selectedClientIsInHouse : function() {
		var selectedClient = Session.get('selected_client');
		return _.has(selectedClient, 'in_house') ? selectedClient['in_house'] : false;	
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
		this.setClientsAsReady(clients);
	},
	getClientsFromProfile : function(profile) {
		var clients = _.has(profile, 'clients') ? profile.clients : ['usa_today'];
		clients = clients == 'all' ? _.keys(Session.get('clients_by_id')) : clients;
		return clients;
	},
	setClientsAsReady : function(clients) {
		if(!Session.get('clients_are_ready')) {
			var clientID = clientHandler.getSelectedClientID();
			if(Session.get('clients_by_id') != {}) {
				clientHandler.setSelectedClient();
				Session.set('clients_are_ready', true);
				if(Session.get('redirect_from_home')) {
					this.handleHomeRoute();
					
				}
			}
		}
	}
};