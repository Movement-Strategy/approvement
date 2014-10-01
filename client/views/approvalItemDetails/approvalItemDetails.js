
Template['approvalItemDetails'].helpers({
	preview_content : function() {
		return detailsHandler.getPreviewContent();
	},
	show_dropdowns : function() {
		return detailsHandler.showDropdowns();	
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
		return detailsHandler.isPreviewShown();
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
		stateManager.changeToState('updated');
	},
	'click .reject.button' : function() {
		stateManager.changeToState('rejected');
	},
	'click .approve.button' : function() {
		stateManager.changeToState('approved');
	},
	'click .comment.button' : function() {
		stateManager.changeToState('commented');
	},
	'click .back.icon' : function() {
		detailsHandler.hideDetails();
	},
	'click .update.button' : function() {
		stateManager.changeToState('updated');
	},
	'click .delete.button' : function() {
		promptModalHandler.show('approval_item');
	}
});

