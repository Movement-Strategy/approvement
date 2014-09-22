twitterHandler = {
	tweetBodyIsBeingEdited : function() {
		return Session.get('edited_input_id') == 'tweet_body';
	},
	getCharactersRemaining : function() {
		return 140 - Session.get('tweet_length');
	},
	initializeTweetLength : function() {
		if(Session.equals('tweet_length', null) && $('#tweet_body_input').length){
			this.setTweetLengthFromInput();
		}
	},
	setTweetLengthFromInput : function() {
		Session.set('tweet_length', $('#tweet_body_input').val().length);
	},
	setTweetLengthOnKeydown : function() {
		if($('#tweet_body_input').length) {
			this.setTweetLengthFromInput();
		}
	}
};