Template['draftBoardBody'].helpers({
	content_buckets : function() {
		return contentBuckets = contentBucketHandler.getContentBuckets();
	},
	initializeModal : function() {
	contentBucketModalHandler.initializeModal();	
	},
});

Template['draftBoardBody'].events({
});

