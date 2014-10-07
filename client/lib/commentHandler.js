commentHandler = {
	getCurrentComments : function() {
		return Comment.find({client_id : Session.get('selected_client_id'), approval_item_id : Session.get('current_item_id')}, {sort: {created_time: 1}}).fetch();
	},
	onCreateKeydown : function(event) {
		if($(".comment-input").is(":focus") && event.which == 13) {
			var commentText = $(".comment-create").val();			
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
	onEditKeydown : function(event) {
		this.handleEditEscape(event);
		this.handleEditEnter(event);
	},
	handleEditEscape : function(event) {
		if(event.which == 27) {
			var selector = this.getElementSelector('input');
			$(selector).blur();
		}
	},
	handleEditEnter : function(event) {
		if(event.which == 13) {
			var selector = this.getElementSelector('input');
			var updatedText = $(selector).val();
			if(updatedText != '') {
				Meteor.call('updateComment', Session.get('edited_comment_id'), updatedText);
				Session.set('comment_edit_successful', true);
			}
			$(selector).blur();
		}	
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
			Session.set('details_can_close', true);
		});
	},
	beingEdited : function(context) {
		return context._id == Session.get('edited_comment_id');
	},
	onClickComment : function(context) {
		Session.set('details_can_close', false);
		Session.set('edited_comment_id', context._id);
		var selector = this.getElementSelector('input');
		Meteor.flush();
		$(selector).focus();
	},
	onCreateFocus : function() {
		Session.set('details_can_close', false);
	},
	onCreateBlur : function() {
		Session.set('details_can_close', true);
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
			client_id : Session.get('selected_client_id'),
			name : Session.get('user_name'),
			avatar : Session.get('user_picture'),
		};
	}
	
};