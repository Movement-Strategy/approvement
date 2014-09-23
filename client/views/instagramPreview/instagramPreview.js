Template['instagramPreview'].helpers({
	image_url : function() {
		return imageUploadHandler.getImageURL();
	},
	profile_pic_url : function() {
		return facebookHandler.getProfilePictureURL();
	},
	display_name : function() {
		return clientHandler.getTwitterProfileName();
	}
});

Template['instagramPreview'].events({
});

