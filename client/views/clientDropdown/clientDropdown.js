Template['clientDropdown'].helpers({
	initialize : function() {
		if(Session.get('clients_are_ready')) {
			Meteor.defer(function(){
				$('.client-dropdown').dropdown();
			});
		}
	},
	selected_client_name : function() {
		var selectedClient = Session.get('selected_client');
		var clientName = Session.get('clients_are_ready') ? selectedClient.display_name : 'Client';
		return clientName;
	},
	selected_client_id : function() {
		return Session.get('selected_client_id');
	},
	clients : function() {
		var clientsByID = Session.get('clients_by_id');
		var clients = Session.get('current_clients') == 'all' ? _.keys(clientsByID) : Session.get('current_clients');
		clients = _.map(clients, function(clientID){
			clientDetails = clientsByID[clientID];
			return {
				value : clientID,
				display : clientDetails['display_name'],
			};
		});
		return clients;
	},
	
});

Template['clientDropdown'].events({
	'change .client-dropdown' : function(event) {		
		Session.set('selected_client_id', event.target.value);
	},
});


