Template['draftBoardBody'].helpers({
	content_buckets : function() {
		return contentBucketHandler.getContentBuckets();
	},
	draft_variables : function() {
		return _.values(this.draft_variables);	
	},
});

Template['draftBoardBody'].events({
});

