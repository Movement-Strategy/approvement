Template['imageCell'].helpers({
	image_url : function() {
// 		var imageURL = contentBucketHandler.getValueForDraftVariable('image', this.draft_item_id, this.content_bucket_id);
		var imageURL = this.value;
		if(imageURL == null) {
			imageURL = '/images/image-place.png';
		}
		return imageURL;
	},
	show_image : function() {
		return this.value != null;
	}
});

Template['imageCell'].events({
});

