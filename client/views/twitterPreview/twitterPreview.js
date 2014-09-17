tweetBodyIsBeingEdited = function() {
	return Session.get('edited_input_id') == 'tweet_body';
};

getCharactersRemaining = function() {
	return 140 - Session.get('tweet_length');
}

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
	characters_remaining : function() {
		if(Session.equals('tweet_length', null) && $('#tweet_body_input').length){
			Session.set('tweet_length', $('#tweet_body_input').val().length);
		}
		return getCharactersRemaining();
	},
	number_class : function() {
		var remaining = getCharactersRemaining();
		return remaining >= 0 ? '' : 'over-limit';
	},
	tweet_is_being_edited : function() {
		return tweetBodyIsBeingEdited();
	},
	picture_class : function() {
		return Session.get('current_content_type') == 'with_picture' ? 'has-picture' : '';
	}
});

Template['twitterPreview'].events({
	'keydown .twitter-body' : function() {
		if($('#tweet_body_input').length) {
			Session.set('tweet_length', $('#tweet_body_input').val().length);
		}
	}
});

