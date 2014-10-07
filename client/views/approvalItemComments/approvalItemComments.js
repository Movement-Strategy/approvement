

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
});

Template['approvalItemComments'].events({
	'keydown .comment-create' : function(event) {
		commentHandler.onCreateKeydown(event);
	},
	'keydown .comment-edit' : function(event) {
		commentHandler.onEditKeydown(event);
	},
	'click .delete-comment' : function() {
		commentHandler.deleteComment(this);
	},
	'focus .comment-create' : function(event) {
		commentHandler.onCreateFocus();
	},
	'blur .comment-create' : function() {
		commentHandler.onCreateBlur();
	},
	'blur .comment-edit' : function() {
		commentHandler.onEditBlur();	
	},
	'click .comment-display-text' : function() {
		commentHandler.onClickComment(this);
	}
});

