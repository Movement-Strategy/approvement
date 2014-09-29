

Template['approvalItemComments'].helpers({
	comments : function() {
		return commentHandler.getCurrentComments();
	},
	formatted_date : function() {
		return timeHandler.getFormattedDate();
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
	}
});

Template['approvalItemComments'].events({
	'keydown' : function(event) {
		commentHandler.onKeydown(event);
	},
	'focus' : function(event) {
		commentHandler.onFocus();
	},
	'blur' : function() {
		commentHandler.onBlur();
	}
});

