commentHandler = {
	getCurrentComments : function() {
		var comments = Comment.find({client_id : clientHandler.getSelectedClientID(), approval_item_id : Session.get('current_item_id')}, {sort: {created_time: 1}}).fetch();
		Session.set('comment_count', comments.length);
		return comments;
	},
	onCreateEnterPress : function() {
		var commentText = $(".comment-create").val();			
		if(commentText != '') {
			var comment = this.buildComment(commentText);
			Meteor.call('insertComment', comment);
			this.emptyCommentInput();
			Meteor.defer(function(){
				$(".comment-input").blur();
			});
		}
	},
	onEnterPress : function(context) {
		if(context.creating_new) {
			this.onCreateEnterPress();
		} else {
			this.onEditEnterPress();
		}
	},
	onEditEscapePress : function() {
		var selector = this.getElementSelector('input');
		$(selector).blur();
	},
	commentCanBeEdited : function(context) {
		return context.name == Session.get('user_name');
	},
	onEditEnterPress : function() {
		var selector = this.getElementSelector('input');
		var updatedText = $(selector).val();
		if(updatedText != '') {
			Meteor.call('updateComment', Session.get('edited_comment_id'), updatedText);
			Session.set('comment_edit_successful', true);
		}
		$(selector).blur();
	},
	getElementSelector : function(type) {
		var selectorMap = {
			display : '.comment-display-',
			input : '.comment-input-',
		};
		return selectorMap[type] + Session.get('edited_comment_id');	
	},
	cancelCommentEdit : function() {
		var selector = this.getElementSelector('display');
		Session.set('edited_comment_id', null);
		var transition = Session.get('comment_edit_successful') ? 'pulse' : 'shake';
		Meteor.flush();
		$(selector).transition(transition, onHide = function(){
			Session.set('comment_edit_successful', false);
			settingsWindowHandler.changeToKeyMode();
		});
	},
	changeToKeyMode : function() {
		keyStrokeHandler.setKeyMode('input', 'approval_item_comments');	
	},
	beingEdited : function(context) {
		return context._id == Session.get('edited_comment_id');
	},
	onClickComment : function(context) {
		Session.set('edited_comment_id', context._id);
		var selector = this.getElementSelector('input');
		Meteor.flush();
		this.changeToKeyMode();
		$(selector).focus();
	},
	onEditBlur : function() {
		this.cancelCommentEdit();	
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
			client_id : clientHandler.getSelectedClientID(),
			name : Session.get('user_name'),
			avatar : Session.get('user_picture'),
		};
	}
	
};