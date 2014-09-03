Template['approvalItemDetails'].helpers({
	
	preview_content : function() {
		return {
			clickable_inputs : Session.get('clickable_inputs'),
			preview_template : Session.get('current_network_type') + 'Preview',
		};
	},
	initializeModal : function() {
		Meteor.defer(function(){
			$('.prompt-modal').modal();
		});
	},
	clickable_inputs : function() {
		return Session.get('clickable_inputs');
	},
	creating_new_item : function() {
		return Session.get('creating_new_item');
	},
 	is_content_type_chosen : function() {
		return Session.get('current_content_type') != null;
	},
	details_shown : function() {
		return Session.get('details_shown');	
	},
	show_class : function() {
		return Session.get('details_shown') ? '' : 'hidden';
	},
});

var keydownHandler = function(event) {
	if(Session.get('details_shown') && event.which == 27) {
		if(Session.get('details_can_close')) {
			hideCreationModal();
		}
	}
};

Template.approvalItemDetails.created = function() {
    $(document).on('keydown', keydownHandler);
};

Template['approvalItemDetails'].events({
	'click .submit.button' : function() {
		var approvalItem = getCurrentApprovalItemFromModal();
		Meteor.call('insertApprovalItem', approvalItem);
		hideCreationModal();
	},
	'click .reject.button' : function() {
		stateManager.changeToState('rejected');
		hideCreationModal();
	},
	'click .approve.button' : function() {
		stateManager.changeToState('approved');
		hideCreationModal();
	},
	'click .comment.button' : function() {
		stateManager.changeToState('commented');
		hideCreationModal();
	},
	'click .back.button' : function() {
		hideCreationModal();
	},
	'click .update.button' : function() {
		var contents = getDynamicContentFromModal();
		stateManager.changeToState('updated', contents);
		hideCreationModal();
	},
	'click .delete.button' : function() {
		showPromptModal();
	}
});

