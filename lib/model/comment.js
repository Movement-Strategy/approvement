Comment = new Meteor.Collection('comment');

// Collection2 already does schema checking
// Add custom permission rules if needed
Comment.allow({
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
		insertComment : function(comment) {
			Comment.insert(comment);
		},
		removeComment : function(commentID) {
			Comment.remove(commentID);
		},
		removeAllComments : function() {
			Comment.remove({});	
		},
		updateComment : function(id, text) {
			Comment.update(id, {$set : {text : text}});	
		},
		removeAllCommentsForApprovalItem : function(itemID) {
			Comment.remove({approval_item_id : itemID});
		}
	});
}

