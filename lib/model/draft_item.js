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

if(Meteor.isServer) {
	Meteor.methods({
		updateDraftItem : function(id, bucketID, query){
			DraftItem.update(id, query);
		},
		insertDraftItem : function(item) {
			DraftItem.insert(item);
		},
		removeAllDraftItems : function() {
			DraftItem.remove({});
		}
	});
} else {
	Meteor.methods({
		updateDraftItem : function(id, bucketID, query){
			DraftItem.update(id, query);
		},
		insertDraftItem : function(item) {
			DraftItem.insert(item);
		},
		removeAllDraftItems : function() {
			DraftItem.remove({});
		}
	});
}


