Template['twitterPreview'].helpers({
	image_url : function() {
		return imageUploadHandler.getImageURL();
	},
	twitter_profile_name : function() {
		return Session.get('selected_client').twitter_profile_name;{{}}
	},
	display_name : function() {
		return Session.get('selected_client').display_name;
	},
	profile_pic_url : function() {
		return facebookHandler.getProfilePictureURL();
	},
	show_image : function() {
		return Session.get('current_content_type') == 'with_picture';
	},
	picture_class : function() {
		return Session.get('current_content_type') == 'with_picture' ? 'has-picture' : '';
	}
});

Template['twitterPreview'].events({
	
});

