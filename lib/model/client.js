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
		create_test_client : function() {
			var client = {
				_id : 'xero',
				profile_pictures : {
					facebook : 	'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/p40x40/1653994_729135733783335_1605746643_n.jpg',
				},
				display_name : 'Xero',
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


