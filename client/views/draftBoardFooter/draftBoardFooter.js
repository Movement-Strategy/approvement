Template['draftBoardFooter'].helpers({
});

Template['draftBoardFooter'].events({
	'click .convert.button' : function() {
		contentBucketHandler.convertAllDraftItemsToApprovalItems();
	},
	'click .create.button' : function() {
		contentBucketModalHandler.showModal({}, true);
	},
});

