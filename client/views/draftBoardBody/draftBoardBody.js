Template['draftBoardBody'].helpers({
	content_buckets : function() {
		var contentBuckets = contentBucketHandler.getContentBuckets();
		return contentBuckets;
	},
	initializeModal : function() {
		contentBucketModalHandler.initializeModal();	
	},
});

Template['draftBoardBody'].events({
});

