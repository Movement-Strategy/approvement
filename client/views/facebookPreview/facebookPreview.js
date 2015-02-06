Template['facebookPreview'].helpers({
	image_url : function() {
		return imageUploadHandler.getImageURL();
	},
	profile_pic_url : function() {
		var allowCustomization = true;
		return facebookHandler.getProfilePictureURL(allowCustomization);
	},
	display_name : function() {
		var allowCustomization = true;
		return clientHandler.getClientName(allowCustomization);
	},
	is_link_type : function() {
		return contentTypeBuilder.isType('link');
	},
	is_photo_type : function() {
		return contentTypeBuilder.isType('photo');
	},
	is_status_type : function() {
		return contentTypeBuilder.isType('status');
	},
	fixed_class : function() {
		return contentTypeBuilder.isType('link') ? 'fixed-size' : ''; 
	}
});

Template['facebookPreview'].events({
		
});

