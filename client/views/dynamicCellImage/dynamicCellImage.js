
Template['dynamicCellImage'].helpers({
	bucket_id : function() {
		return this.content_bucket_id;
	},
});

Template['dynamicCellImage'].events({
	'change .draft-file-bag' : function(event) {
		imageUploadHandler.onDraftFileChange(event, this);
	},
});




