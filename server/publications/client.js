Meteor.publish('client', function () {
    return Client.find();
});

