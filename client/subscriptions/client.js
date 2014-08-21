Meteor.subscribe('client', onReady = function(){
	var clients = Client.find().fetch();
	var clientsByID = {};
	_.map(clients, function(client){
		clientsByID[client._id] = client;
	});
	Session.set('clients_by_id', clientsByID);	
});

