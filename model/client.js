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
				_id : 'usa_today',
				profile_pictures : {
					facebook : 	'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/c12.12.155.155/s40x40/1010865_10151474071775667_343037047_n.png',
				},
				display_name : 'USA Today',
			};
			Client.insert(client);
		}
	});
}

