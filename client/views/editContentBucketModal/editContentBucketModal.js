Template['editContentBucketModal'].helpers({
	description : function() {
		var bucket = Session.get('current_content_bucket');
		return _.has(bucket, 'description') ? bucket['description'] : '';
	},
	creating_new : function() {
		return Session.get('creating_new_bucket');	
	},
	initializeToggle : function() {
		contentBucketHandler.initializeModalToggle();
	}
});

Template['editContentBucketModal'].events({
	'click .edit.button' : function(event) {
		contentBucketModalHandler.onEditContentBucket(event);
	},
	'click .create.button' : function(event) {
		contentBucketModalHandler.onCreateContentBucket(event);
	}
});

