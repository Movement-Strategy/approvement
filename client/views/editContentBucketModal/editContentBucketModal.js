Template['editContentBucketModal'].helpers({
	mode_name : function() {
		return Session.get('creating_new_bucket') ? 'Create' : 'Edit';
	},
	description_has_error : function() {
		var bucketChangeErrors = Session.get('bucket_change_errors');
		return _.has(bucketChangeErrors, 'description');
	},
	description : function() {
		var bucket = Session.get('current_content_bucket');
		return _.has(bucket, 'description') ? bucket['description'] : '';
	},
	is_repeating : function() {
		return Session.get('bucket_is_repeating');
	},
	creating_new : function() {
		return Session.get('creating_new_bucket');
	},
	initializeToggles : function() {
		contentBucketModalHandler.initializeRepeatsToggle();
		contentBucketModalHandler.initializeRequiredToggle();
	},
	initializeDropdowns : function() {
		Meteor.defer(function(){
			intervalHandler.initializeDropdowns();
		});
	},
});

Template['editContentBucketModal'].events({
	'click .edit-bucket.button' : function(event) {
		var isInsert = false;
		contentBucketModalHandler.onBucketChange(isInsert);
	},	
	'click .create-bucket.button' : function(event) {
		var isInsert = true;
		contentBucketModalHandler.onBucketChange(isInsert);
	},
	'click .back-bucket.button' : function(){
		contentBucketModalHandler.hideModal();
	},
});		

