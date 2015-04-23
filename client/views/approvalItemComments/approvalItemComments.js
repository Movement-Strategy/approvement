

Template['approvalItemComments'].helpers({
	comments : function() {
		return commentHandler.getCurrentComments();
	},
	being_edited : function() {
		return commentHandler.beingEdited(this);
	},
	formatted_date : function() {
		return timeHandler.getFormattedDate(this);
	},
	user_name : function() {
		return userHandler.getName();
	},
	user_picture : function() {
		return userHandler.getPicture();
	},
	width_class : function() {
		return detailsHandler.getWidthClass();
	},
	initializeTextarea : function() {
		Meteor.defer(function(){
			$('textarea.comment-input').autosize();
		});
	},
	display_class : function() {
		return "comment-display-" + this._id;
	},
	input_class : function() {
		return "comment-input-" + this._id;
	},
	edit_class : function() {
		return commentHandler.commentCanBeEdited(this) ? 'comment-display-text' : '';
	}
});

Template['approvalItemComments'].events({
	'keydown .comment-create' : function(event) {
		var context = {
			creating_new : true,
		};
		keyStrokeHandler.handleKeyStrokesOnInput('down', event, context);
	},
	'keydown .comment-edit' : function(event) {
		var context = {
			creating_new : false,
		};
		keyStrokeHandler.handleKeyStrokesOnInput('down', event, context);
	},
	'click .delete-comment' : function() {
		commentHandler.deleteComment(this);
	},
	'focus .edit-edit' : function(event) {
		Meteor.defer(function(){
			commentHandler.changeToKeyMode();	
		})	
	},
	'focus .comment-create' : function(event) {
		Meteor.defer(function(){
			commentHandler.changeToKeyMode();
		});
	},
	'blur .comment-create' : function() {
		settingsWindowHandler.changeToKeyMode();
	},
	'blur .comment-edit' : function() {
		commentHandler.onEditBlur();	
	},
	'click .comment-display-text' : function() {
		commentHandler.onClickComment(this);
	}
});

keyStrokeHandler.types('input',{
	approval_item_comments : {
		on_enter_down : function(event, context) {
			commentHandler.onEnterPress(context);
		},
		on_escape_down : function(event, context) {
			if(!context.creating_new) {
				commentHandler.onEditEscapePress(context);
			}
		}
	},
});




