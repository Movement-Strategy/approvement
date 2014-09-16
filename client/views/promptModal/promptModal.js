Template['promptModal'].helpers({
});

Template['promptModal'].events({
	'click .button.delete' : function() {
		promptModalHandler.handleDelete();
	},
	'click .button.cancel' : function() {
		promptModalHandler.hide();
	}
});

