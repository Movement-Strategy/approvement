Template['linkedPreview'].helpers({
	image_url : function() {
		return imageUploadHandler.getImageURL();
	},
	profile_pic_url : function() {
		return facebookHandler.getProfilePictureURL();
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
		return clientHandler.getClientName();
	},
});

Template['linkedPreview'].events({
	
});

