Meteor.publish('asset', function (clientID) {
    return Asset.find({client_id : clientID});
});

