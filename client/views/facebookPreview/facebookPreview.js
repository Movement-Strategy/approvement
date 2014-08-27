Template['facebookPreview'].helpers({
	image_url : function() {
		return imageUploadHandler.getImageURL();
	},
	profile_pic_url : function() {
		return Session.get('selected_client').profile_pictures.facebook;
	},
	display_name : function() {
		return Session.get('selected_client').display_name;
	}
});

Template['facebookPreview'].events({
});

