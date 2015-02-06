Template['instagramPreview'].helpers({
	image_url : function() {
		return imageUploadHandler.getImageURL();
	},
	profile_pic_url : function() {
		var allowCustomization = true;
		return facebookHandler.getProfilePictureURL(allowCustomization);
	},
	display_name : function() {
		return clientHandler.getTwitterProfileName();
	}
});

Template['instagramPreview'].events({
});

