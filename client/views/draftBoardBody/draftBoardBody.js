Template['draftBoardBody'].helpers({
	content_buckets : function() {
		var contentBuckets = contentBucketHandler.getContentBuckets();
		Meteor.defer(function(){
			$('.inline-dropdown').dropdown({onChange : function(value, text){
				contentBucketHandler.onDropdownChange(value, text, this);
			}});
		});
		return contentBuckets;
	},
});

Template['draftBoardBody'].events({
});

