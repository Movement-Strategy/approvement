Template['draftBoardBody'].helpers({
	content_buckets : function() {
		var contentBuckets = contentBucketHandler.getContentBuckets();
		return contentBuckets;
	},
});

Template['draftBoardBody'].events({
});

