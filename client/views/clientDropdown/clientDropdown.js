
Template['clientDropdown'].helpers({
	initialize : function() {
		clientHandler.initializeClientDropdown();
	},
	selected_client_name : function() {
		return clientHandler.getSelectedClientName();
	},
	selected_client_id : function() {
		return clientHandler.getSelectedClientID();
	},
	clients : function() {
		return clientHandler.getClientsForDropdown();
	},
	
});

Template['clientDropdown'].events({
	'change .client-dropdown' : function(event) {		
		return clientHandler.onChangeClientDropdown(event);
	},
});


