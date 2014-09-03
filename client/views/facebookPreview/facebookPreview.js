Template['facebookPreview'].helpers({
	image_url : function() {
		return imageUploadHandler.getImageURL();
	},
	profile_pic_url : function() {
		return facebookHandler.getProfilePictureURL();
	},
	display_name : function() {
		return Session.get('selected_client').display_name;
	},
	is_photo_type : function() {
		return Session.get('current_content_type') == 'photo';
	},
	fixed_class : function() {
		return Session.get('current_content_type') == 'link' ? 'fixed-size' : ''; 
	}

});

Template['facebookPreview'].events({
});

