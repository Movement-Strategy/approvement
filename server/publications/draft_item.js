Meteor.publish('draft_item', function () {
    return DraftItem.find();
});

