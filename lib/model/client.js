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
					facebook : 	'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/p50x50/1653994_729135733783335_1605746643_n.jpg?oh=a2751dbb1dfe6461e4c4e35ee17c300b&oe=54807A0B&__gda__=1416901503_3e85f91b2aa56968f20d879ab37cedc4',
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


