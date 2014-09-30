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
		createClient : function(id, displayName, facebookProfileName, twitterProfileName, usersToNotify) {
			
			var client = {
				_id : id,
				facebook_profile_name : facebookProfileName,
				twitter_profile_name : twitterProfileName,
				display_name : displayName,
				users_to_notify : usersToNotify,
			};
			Client.upsert(id, client);
		},
		getUsersToNotify : function(clientID, userNames) {
			if(userNames) {
				var query = {
					$or : [
						// supplied users
						{
							username : {$in : userNames},
						},
						
						// clients for the supplied client id
						{
							"profile.clients" : clientID,
							"profile.user_type" : 'client',
						},
					],
				};
				var usersToNotify = Meteor.users.find(query).fetch();
				usersToNotify = _.map(usersToNotify, function(user){
					return {
						name : user.profile.name,
						type : user.profile.user_type,
						email : user.profile.email,
					};
				});
				return usersToNotify;	
			} else {
				return [];
			}
		},
		
	});
}


