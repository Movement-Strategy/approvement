Meteor.publish('approval_items_for_this_user', function () {
    return ApprovalItem.find();
});

