Template['draftBoardFooter'].helpers({
	there_are_buckets : function() {
		return Session.get('bucket_count') > 0;	
	},
});

Template['draftBoardFooter'].events({
	'click .convert.button' : function() {
		contentBucketHandler.convertAllDraftItemsToApprovalItems();
	},
	'click .create.button' : function() {
		contentBucketModalHandler.showModal({}, true);
	},
});

