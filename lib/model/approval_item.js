ApprovalItem = new Meteor.Collection('approval_item');

// Collection2 already does schema checking
// Add custom permission rules if needed
ApprovalItem.allow({
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
		uploadImage: function(url, context) {
			return url;
		},
		insertApprovalItem : function(newApprovalItem) {
			ApprovalItem.insert(newApprovalItem);
		},
		removeAllApprovalItems : function() {
			ApprovalItem.remove({});
		},
		updateStatus : function(id, fieldsToUpdate) {
			var updateQuery = {
				$set : {},
			};
			_.map(fieldsToUpdate, function(value, key){
				updateQuery['$set'][key] = value;
			}); 
			ApprovalItem.update(id, updateQuery);
		},
		addComment : function(id, comment) {
			var updateQuery = {
				$push : {
					comments : comment,
				},
			};
			ApprovalItem.update(id, updateQuery);
		},
	});
}
/*
	var testRecord = {
		scheduled_time : 1407877893000,
		scope : 'external',
		created_time : new Date().getTime(),
		type : 'instagram',
		status : 'commented',
	};
	
	ApprovalItem.insert(testRecord);
*/
