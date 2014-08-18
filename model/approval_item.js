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
}

