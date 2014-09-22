

Template['twitterPreview'].helpers({
	image_url : function() {
		return imageUploadHandler.getImageURL();
	},
	has_text : function() {
		return !contentTypeBuilder.isType('with_picture_no_text');
	},
	twitter_profile_name : function() {
		return clientHandler.getTwitterProfileName();
	},
	display_name : function() {
		return clientHandler.getClientName();
	},
	profile_pic_url : function() {
		return facebookHandler.getProfilePictureURL();
	},
	show_image : function() {
		return !contentTypeBuilder.isType('without_picture');
	},
	characters_remaining : function() {
		twitterHandler.initializeTweetLength();
		return twitterHandler.getCharactersRemaining();
	},
	number_class : function() {
		var remaining = twitterHandler.getCharactersRemaining();
		return remaining >= 0 ? '' : 'over-limit';
	},
	tweet_is_being_edited : function() {
		return twitterHandler.tweetBodyIsBeingEdited();
	},
	picture_class : function() {
		return !contentTypeBuilder.isType('without_picture') ? 'has-picture' : '';
	}
});

Template['twitterPreview'].events({
	'keydown .twitter-body' : function() {
		twitterHandler.setTweetLengthOnKeydown();
	}
});

