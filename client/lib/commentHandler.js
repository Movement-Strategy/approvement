commentHandler = {
	setCommentsFromDayContext : function(context) {
		var comments = _.has(context, 'comments') ? context.comments : [];
		if(context._id == Session.get('current_item_id')) {
			Session.set('current_comments', comments);
		}
	},
	getCurrentComments : function() {
		return Session.get('current_comments');	
	},
	onKeydown : function(event) {
		if($(".comment-input").is(":focus") && event.which == 13) {
			var commentText = $(".comment-input").val();
			if(commentText != '') {
				var comment = this.buildComment(commentText);
				Meteor.call('addComment', Session.get('current_item_id'), comment);
				this.emptyCommentInput();
				Meteor.defer(function(){
					$(".comment-input").blur();
				});
			}
		}
	},
	onFocus : function() {
		Session.set('details_can_close', false);
	},
	onBlur : function() {
		Session.set('details_can_close', true);
	},
	emptyCommentInput : function() {
		$(".comment-input").val("");
	},
	buildComment : function(commentText) {
		var timestamp = new Date().getTime();
		return {
			text : commentText,
			created_time : timestamp,
			name : Session.get('user_name'),
			avatar : Session.get('user_picture'),
		};
	}
	
};