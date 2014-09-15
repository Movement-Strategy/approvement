Template['linkedPreview'].helpers({
	image_url : function() {
		return imageUploadHandler.getImageURL();
	},
	profile_pic_url : function() {
		console.log(this);
		return facebookHandler.getProfilePictureURL();
	},
	picture_class : function() {
		return Session.get('current_content_type') == 'without_picture' ? 'no-picture' : '';
	},
	has_picture : function() {
		return Session.get('current_content_type') == 'with_picture';
	},
	display_name : function() {
		return Session.get('selected_client').display_name;
	},
});

Template['linkedPreview'].events({
	
});

