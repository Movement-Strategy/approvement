Meteor.publish('comments_for_client', function (clientID) {
    return Comment.find({client_id :  clientID});
});

