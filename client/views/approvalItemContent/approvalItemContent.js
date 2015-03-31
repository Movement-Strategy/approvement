Template['approvalItemContent'].helpers({
	handle_show : function() {
		var params = Session.get('details_params');
		if(settingsWindowHandler.typeIsShown('approval_item_details') && params != null) {
			detailsHandler.onShowDetails(params['context'], params['is_creating_new']);
		}
	},
	details_shown : function() {
		return detailsHandler.detailsShown();
	},
	preview_content : function() {
		return detailsHandler.getPreviewContent();
	},
	show_custom_dropdown : function() {
		return customClientHandler.dropdownIsRequired() && customClientHandler.dropdownShouldBeShown();	
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
});

Template['approvalItemContent'].events({
	'click .submit.button' : function() {
		stateManager.changeToState('updated');
	},
	'click .unapprove.button' : function() {
		stateManager.changeToState('unapproved');
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

