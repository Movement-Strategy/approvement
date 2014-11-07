DraftItem = new Meteor.Collection('draft_item');

// Collection2 already does schema checking
// Add custom permission rules if needed
DraftItem.allow({
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



