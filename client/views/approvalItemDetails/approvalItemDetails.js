
Template['approvalItemDetails'].helpers({
	preview_content : function() {
		return detailsHandler.getPreviewContent();
	},
	initializeModal : function() {
		promptModalHandler.initializeModal();
	},
	initializeAccordion : function() {
		detailsHandler.initializeAccordion();
	},
	width_class : function() {
		return detailsHandler.getWidthClass();;
	},
	has_more_than_one_content_type : function() {
		return !contentTypeBuilder.hasOnlyOneContentType();
	},
	clickable_inputs : function() {
		return inputBuilder.getClickableInputs();
	},
	creating_new_item : function() {
		return detailsHandler.creatingNewItem();
	},
 	is_content_type_chosen : function() {
		return contentTypeBuilder.isContentTypeChosen();
	},
 	is_preview_shown : function() {
		return contentTypeBuilder.isContentTypeChosen();
	},
	network_type_name : function() {
		return networkTypeBuilder.getTypeName();
	},
	details_shown : function() {
		return detailsHandler.detailsShown();
	},
	show_class : function() {
		return detailsHandler.detailsShown() ? '' : 'hidden';
	},
});


Template.approvalItemDetails.created = function() {
    $(document).on('keydown', keyStrokeHandler.handleKeyStrokes);
};

Template['approvalItemDetails'].events({
	'click .submit.button' : function() {
		detailsHandler.updateContents();
	},
	'click .reject.button' : function() {
		stateManager.changeToState('rejected');
		detailsHandler.hideDetails();
	},
	'click .approve.button' : function() {
		stateManager.changeToState('approved');
		detailsHandler.hideDetails();
	},
	'click .comment.button' : function() {
		stateManager.changeToState('commented');
		detailsHandler.hideDetails();
	},
	'click .back.icon' : function() {
		detailsHandler.hideDetails();
	},
	'click .update.button' : function() {
		detailsHandler.updateContents();
	},
	'click .delete.button' : function() {
		promptModalHandler.show('approval_item');
	}
});

