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
		handleInvalidLink : function(id) {
			var query = {
				$set : {
					'contents.link_body' : "Link is Invalid : please update",
					'contents.link_text' : "Link is Invalid : please update",
				},
			};
			
			ApprovalItem.update(id, query);
		},
		insertApprovalItem : function(newApprovalItem) {
			return ApprovalItem.insert(newApprovalItem);
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
	});
} else {
	Meteor.methods({
		updateStatus : function(id, fieldsToUpdate) {
			updateStatus(id, fieldsToUpdate);
		},
		insertApprovalItem : function(newApprovalItem) {
			return ApprovalItem.insert(newApprovalItem);
		},
		removeItem : function(id) {
			ApprovalItem.remove(id);
		},
	});
}

