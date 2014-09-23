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
		createClient : function(id, displayName, facebookProfileName, twitterProfileName) {
			
			var client = {
				_id : id,
				facebook_profile_name : facebookProfileName,
				twitter_profile_name : twitterProfileName,
				display_name : displayName,
			};
			Client.upsert(id, client);
		}
		
	});
}


