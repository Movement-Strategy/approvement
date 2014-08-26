Client = new Meteor.Collection('client');

// Collection2 already does schema checking
// Add custom permission rules if needed
Client.allow({
    insert : function () {
        return true;
    },
    update : function () {
        return true;
    },
    remove : function () {
        return true;
    }
});

if(Meteor.isServer) {
	Meteor.methods({
		createClient : function(id, displayName, profilePicture) {
			
			var client = {
				_id : id,
				profile_pictures : {
					facebook : profilePicture,
				},
				display_name : displayName,
			};
			Client.insert(client);
		}
		
	});
} else {
	setSelectedClient = function(){
		Deps.autorun(function(){
			var clientID = Session.get('selected_client_id');
			var clientsByID = Session.get('clients_by_id');
			Session.set('selected_client', clientsByID[clientID]);
		});
	};
}


