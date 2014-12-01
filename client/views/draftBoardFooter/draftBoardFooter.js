Template['draftBoardFooter'].helpers({
});

Template['draftBoardFooter'].events({
	'click .convert.button' : function() {
		contentBucketHandler.convertAllDraftItemsToApprovalItems();
	},
	'click .save.button' : function() {
		contentBucketHandler.updateContentBuckets();	
	},
	'click .create.button' : function() {
		contentBucketModalHandler.showModal({}, true);
	},
});

