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
	'click .edit-bucket.button' : function(event) {
		contentBucketModalHandler.onEditContentBucket();
	},	
	'click .create-bucket.button' : function(event) {
		contentBucketModalHandler.onCreateContentBucket();
	},
	'click .back-bucket.button' : function(){
		contentBucketModalHandler.hideModal();
	},
});		

