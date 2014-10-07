commentHandler = {
	getCurrentComments : function() {
		return Comment.find({client_id : Session.get('selected_client_id'), approval_item_id : Session.get('current_item_id')}, {sort: {created_time: 1}}).fetch();
	},
	onKeydown : function(event) {
		if($(".comment-input").is(":focus") && event.which == 13) {
			var commentText = $(".comment-input").val();			
			if(commentText != '') {
				var comment = this.buildComment(commentText);
				Meteor.call('insertComment', comment);
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
	deleteComment : function(context) {
		Session.set("comment_id_to_delete", context._id);
		promptModalHandler.show('comment');
	},
	buildComment : function(commentText) {
		var timestamp = new Date().getTime();
		return {
			text : commentText,
			created_time : timestamp,
			approval_item_id : Session.get('current_item_id'),
			client_id : Session.get('selected_client_id'),
			name : Session.get('user_name'),
			avatar : Session.get('user_picture'),
		};
	}
	
};