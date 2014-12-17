Template['imageCell'].helpers({
	show_image : function() {
		return this.value != null;
	},
	is_facebook_link : function() {
		var contentType = contentBucketHandler.getValueForDraftVariable('content_type', this.draft_item_id, this.content_bucket_id);
		var network = contentBucketHandler.getValueForDraftVariable('network', this.draft_item_id, this.content_bucket_id);
		return network == 'facebook' && contentType == 'link';			
	},
	is_loading : function() {
		return this.content_bucket_id == Session.get('loading_bucket_id');
	}
});

Template['imageCell'].events({
});

