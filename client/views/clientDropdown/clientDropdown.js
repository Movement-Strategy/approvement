Template['clientDropdown'].helpers({
	initialize : function() {
		Meteor.defer(function(){
			$('.client-dropdown').dropdown();
		});
	},
	selected_client_name : function() {
		var selectedClient = Session.get('selected_client');
		return Session.get('clients_are_ready') ? selectedClient.display_name : 'Client';
	},
	clients : function() {
		var clients = Session.get('current_clients');
		clientsByID = Session.get('clients_by_id');
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
/* 		Session.set('selected_client_id', event.target.value); */
	},
});


