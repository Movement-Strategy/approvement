Template['editContentBucketModal'].helpers({
	description : function() {
		var bucket = Session.get('current_content_bucket');
		return bucket['description'];	
	},
	initializeToggle : function() {
		contentBucketHandler.initializeModalToggle();
	}
});

Template['editContentBucketModal'].events({
	'click .edit.button' : function(event) {
		contentBucketModalHandler.onEditContentBucket(event);
	}
});

