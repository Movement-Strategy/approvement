Meteor.publish('approval_items_for_this_user', function (userID, userType) {
    return ApprovalItem.find();
});

