Template['twitterPreview'].helpers({
	image_url : function() {
		return imageUploadHandler.getImageURL();
	},
	show_image : function() {
		return Session.get('current_content_type') == 'with_picture';
	}
});

Template['twitterPreview'].events({
	
});

