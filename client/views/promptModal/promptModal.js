Template['promptModal'].helpers({
	modal_content : function() {
		return promptModalHandler.getContent();
	},
	buttons : function() {
		return promptModalHandler.getButtons();
	},	
});

Template['promptModal'].events({
	'click .button.delete' : function() {
		
		// if were deleting, it doesn't matter if any changes have been
		Session.set('changes_made',  false);
		promptModalHandler.handleDelete();
	},
	'click .button.undo' : function() {
		promptModalHandler.hide();
	},
	'click .button.exit' : function() {
		promptModalHandler.handleExit();
	},
	'click .button.cancel' : function() {
		promptModalHandler.hide();
	},
	'click .button.confirm' : function() {
		promptModalHandler.handleConfirm ();
	},
});

