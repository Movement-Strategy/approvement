showPromptModal = function() {
	$('.prompt-modal').modal('show');
}

hidePromptModal = function() {
	$('.prompt-modal').modal('hide');
}

Template['promptModal'].helpers({
});

Template['promptModal'].events({
	'click .button.delete' : function() {
		promptModalHandler.handleDelete();
	},
});

