Template['linkedPreview'].helpers({
	image_url : function() {
		return imageUploadHandler.getImageURL();
	},
	profile_pic_url : function() {
		var allowCustomization = true;
		return facebookHandler.getProfilePictureURL(allowCustomization);
	},
	picture_class : function() {
		return contentTypeBuilder.isType('without_picture') ? 'no-picture' : '';
	},
	has_picture : function() {
		return !contentTypeBuilder.isType('without_picture');
	},
	has_description : function() {
		return !contentTypeBuilder.isType('picture_without_description');
	},
	display_name : function() {
		var allowCustomization = true;
		return clientHandler.getClientName(allowCustomization);
	},
});

Template['linkedPreview'].events({
	
});

