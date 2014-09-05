Template['approvalItemDetails'].helpers({
	
	preview_content : function() {
		return {
			clickable_inputs : Session.get('clickable_inputs'),
			preview_template : Session.get('current_network_type') + 'Preview',
		};
	},
	initializePicker : function() {
		Meteor.defer(function(){
			$('#basicExample').timepicker();
		});	
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

var updateContents = function() {
	if(Session.get('creating_new_item')) {
		var approvalItem = getCurrentApprovalItemFromModal();
		Meteor.call('insertApprovalItem', approvalItem);
		hideCreationModal();
	} else {
		var contents = getDynamicContentFromModal();
		stateManager.changeToState('updated', contents);
		hideCreationModal();
	}
}

var keydownHandler = function(event) {
	
	if(Session.get('details_shown') && event.which == 27 && Session.get('details_can_close')) {
		hideCreationModal();
	}
	
	if(Session.get('details_shown') && event.which == 13 && Session.get('details_can_close')) {
		updateContents();
	}
};

Template.approvalItemDetails.created = function() {
    $(document).on('keydown', keydownHandler);
};

Template['approvalItemDetails'].events({
	'click .submit.button' : function() {
		updateContents();
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
		updateContents();
	},
	'click .delete.button' : function() {
		showPromptModal();
	}
});

