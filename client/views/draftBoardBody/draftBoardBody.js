Template['draftBoardBody'].helpers({
	content_buckets : function() {
		var contentBuckets = contentBucketHandler.getContentBuckets();
		draftBoardHandler.initializeRowPopups();
		return contentBuckets;
	},
});

Template['draftBoardBody'].events({
});

