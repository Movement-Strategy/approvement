Template['imageCell'].helpers({
	image_url : function() {
		var imageURL = contentBucketHandler.getValueForDraftVariable('image', this.draft_item_id, this.content_bucket_id);
		if(imageURL == null) {
			imageURL = '/images/image-place.png';
		}
		return imageURL;
	},
});

Template['imageCell'].events({
});

