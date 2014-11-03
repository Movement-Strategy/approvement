Meteor.publish('content_bucket', function () {
    return ContentBucket.find();
});

