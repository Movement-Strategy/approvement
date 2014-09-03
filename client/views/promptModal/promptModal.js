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
		console.log('firing');
		Meteor.call('removeItem', Session.get('current_item_id'));
		hideCreationModal();
		hidePromptModal();
	},
});

