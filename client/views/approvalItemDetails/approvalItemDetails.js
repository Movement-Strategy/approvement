
// will be called after successful S3 upload
onImageUpload = function(url) {
	Session.set('uploaded_image_url', url);
	
	var selectorMap = {
		facebook : 'link-image',
		instagram : 'instagram-image-container',
		twitter : 'twitter-image-container',
		linked : 'linked-image-container',
	};
	
	var selector = selectorMap[Session.get('current_network_type')];
	selector = '.' + selector;
	$(selector).transition('tada');
}

getWidthClass = function() {
	return Session.get('current_network_type') != null ? Session.get('current_network_type') + '-width' : 'facebook-width';
};

Template['approvalItemDetails'].helpers({
	
	preview_content : function() {
		return {
			clickable_inputs : Session.get('clickable_inputs'),
			preview_template : Session.get('current_network_type') + 'Preview',
		};
	},
	initializeModal : function() {
		Meteor.defer(function(){
			$('.prompt-modal').modal({
				context : $('#main'),
			});
		});
	},
	initializeAccordion : function() {
		Meteor.defer(function(){
			$('.creation-accordion').accordion();
		});
	},
	width_class : function() {
		return getWidthClass();
	},
	has_more_than_one_content_type : function() {
		return !hasOnlyOneContentType();
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
 	is_preview_shown : function() {
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
		var timeToPost = Session.get('time_to_post');
		stateManager.changeToState('updated', contents, timeToPost);
		hideCreationModal();
		
		// the pop up module in semantic ui has issues resetting correctly when content changes
		// so were manually setting the items to be empty and flushing the system so that they can reset
		Session.set('reset_items', true);
		Meteor.flush();
		Session.set('reset_items', false);
		Meteor.flush();
	}
}

var keydownHandler = function(event) {
	
	if(Session.get('details_shown') && event.which == 27 && Session.get('details_can_close')) {
		hideCreationModal();
	}
	
	if(Session.get('details_shown') && event.which == 13 && Session.get('details_can_close')) {
		updateContents();
	}
	
	if(Session.get('current_asset_type') != null && event.which == 27) {
		resetAndTriggerAnimationOnAsset(Session.get('current_asset_id'), 'shake');
	}
	
	if(!Session.get('details_shown') && event.which == 9) {
		pendingItemHandler.goToPendingItem(Session.get('pending_item_index'));
	}
	
	if(!Session.get('details_shown') && event.which == 37) {
		changeToLastWeek();
	}
	
	if(!Session.get('details_shown') && event.which == 39) {
		changeToNextWeek();
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
	'click .back.icon' : function() {
		hideCreationModal();
	},
	'click .update.button' : function() {
		updateContents();
	},
	'click .delete.button' : function() {
		promptModalHandler.show();
	}
});

