Template['facebookPreview'].helpers({
	image_url : function() {
		return imageUploadHandler.getImageURL();
	},
	profile_pic_url : function() {
		return facebookHandler.getProfilePictureURL();
	},
	display_name : function() {
		return Session.get('selected_client').display_name;
	}
});

Template['facebookPreview'].events({
});

