
Template['approvalItemDetails'].helpers({
	day_description : function() {
		return timeHandler.getDayDescription();
	},
	preview_content : function() {
		return detailsHandler.getPreviewContent();
	},
	show_dropdowns : function() {
		return detailsHandler.showDropdowns();	
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

Template.approvalItemDetails.destroyed = function() {
    $(document).unbind('keydown');
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
	'click .finalize.button' : function() {
		stateManager.changeToState('finalized');
	},
	'click .edit.button' : function() {
		stateManager.changeToState('edited');
	},
	'click .back.icon' : function() {
		detailsHandler.onBack();
	},
	'click .update_creative.button' : function() {
		stateManager.changeToState('creative_updated');	
	},
	'click .needs_creative.button' : function() {
		stateManager.changeToState('creative_needed');	
	},
	'click .update.button' : function() {
		stateManager.changeToState('updated');
	},
	'click .delete.button' : function() {
		promptModalHandler.show('approval_item');
	}
});

