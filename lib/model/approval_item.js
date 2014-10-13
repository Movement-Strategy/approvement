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

var updateStatus = function(id, fieldsToUpdate) {
	var updateQuery = {
		$set : {},
	};
	_.map(fieldsToUpdate, function(value, key){
		updateQuery['$set'][key] = value;
	}); 
	ApprovalItem.update(id, updateQuery);
};

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
		removeItem : function(id) {
			ApprovalItem.remove(id);
		},
		updateStatus : function(id, fieldsToUpdate) {
			updateStatus(id, fieldsToUpdate);
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
} else {
	Meteor.methods({
		updateStatus : function(id, fieldsToUpdate) {
			updateStatus(id, fieldsToUpdate);
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

