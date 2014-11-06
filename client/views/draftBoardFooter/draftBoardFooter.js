Template['draftBoardFooter'].helpers({
});

Template['draftBoardFooter'].events({
	'click .convert.button' : function() {
		contentBucketHandler.convertAllContentBucketsIntoApprovalItems();
	},
	'click .save.button' : function() {
		contentBucketHandler.updateContentBuckets();	
	},
});

