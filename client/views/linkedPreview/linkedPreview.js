Template['linkedPreview'].helpers({
	image_url : function() {
		return imageUploadHandler.getImageURL();
	},
	profile_pic_url : function() {
		return facebookHandler.getProfilePictureURL();
	},
	picture_class : function() {
		return Session.get('current_content_type') == 'without_picture' ? 'no-picture' : '';
	},
	has_picture : function() {
		return Session.get('current_content_type') != 'without_picture';
	},
	has_description : function() {
		return !Session.equals('current_content_type', 'picture_without_description');
	},
	display_name : function() {
		return Session.get('selected_client').display_name;
	},
});

Template['linkedPreview'].events({
	
});

