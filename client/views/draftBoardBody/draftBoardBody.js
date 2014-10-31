Template['draftBoardBody'].helpers({
	content_buckets : function() {
		var contentBuckets = contentBucketHandler.getContentBuckets();
		Meteor.defer(function(){
			$('.inline-dropdown').dropdown();
		});
		return contentBuckets;
	},
});

Template['draftBoardBody'].events({
});

