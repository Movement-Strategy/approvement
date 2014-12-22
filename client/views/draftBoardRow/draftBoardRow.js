Template['draftBoardRow'].helpers({
	completed_class : function() {
		
		var converted = contentBucketHandler.bucketHasBeenConverted(this.content_bucket_id);
		if(converted) {
			return 'converted';
		} else {
			return contentBucketHandler.rowIsCompleted(this) ? 'completed' : '';
		}
	},
	draft_variables : function() {
		return contentBucketHandler.getDraftVariablesForRow(this);
	},
});

Template['draftBoardRow'].events({
});

