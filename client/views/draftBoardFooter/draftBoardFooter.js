Template['draftBoardFooter'].helpers({
	there_are_buckets : function() {
		return contentBucketHandler.thereAreBucketsToConvert();	
	},
});

Template['draftBoardFooter'].events({
	'click .convert.button' : function() {
		contentBucketHandler.tryToConvertBucketsToApprovalItems();
	},
	'click .create.button' : function() {
		contentBucketModalHandler.showModal({}, true);
	},
});

