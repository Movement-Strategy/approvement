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
		migrateComments : function() {
			var approvalItems = ApprovalItem.find();
			var updatedComments = [];
			approvalItems.forEach(function(item){
				if(_.has(item, 'comments')){
					_.map(item.comments, function(comment){
						comment['approval_item_id'] = item._id;
						comment['client_id'] = item.client_id;
						updatedComments.push(comment);
					});
				}
			});
			
			Comment.insert(updatedComments);
			 
		}
	});
}

