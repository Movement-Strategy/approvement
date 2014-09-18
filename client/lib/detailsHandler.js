detailsHandler = {
	detailsShown : function(){
		return Session.get('details_shown');
	},
	creatingNewItem : function() {
		return Session.get('creating_new_item');
	},
	showDetails : function(context, creatingNewItem) {
		this.closeShownPopup();
		this.setDefaultsOnShow(context, creatingNewItem);
		if(!creatingNewItem) {
			this.configureDetailsForNewItem(context);
		}
		Session.set('details_shown', true);
	},
	getPreviewContent : function() {
		return {
			clickable_inputs : Session.get('clickable_inputs'),
			preview_template : Session.get('current_network_type') + 'Preview',
		};
	},
	hideDetails : function() {
		emptyCommentInput();
		Session.set('details_shown', false);
	},
	updateContents : function() {
		if(Session.get('creating_new_item')) {
			var approvalItem = this.getCurrentApprovalItemFromDetails();
			Meteor.call('insertApprovalItem', approvalItem);
			detailsHandler.hideDetails();
		} else {
			var contents = this.getDynamicContentFromDetails();
			var timeToPost = Session.get('time_to_post');
			stateManager.changeToState('updated', contents, timeToPost);
			detailsHandler.hideDetails();
			
			// the pop up module in semantic ui has issues resetting correctly when content changes
			// so were manually setting the items to be empty and flushing the system so that they can reset
			Session.set('reset_items', true);
			Meteor.flush();
			Session.set('reset_items', false);
			Meteor.flush();
		}
	},
	resetDetailsContent : function() {
		Session.set('uploaded_image_url', null);
		Session.set('current_item_contents', {});
		Session.set('current_network_type', null);
		Session.set('current_content_type', null);
		Session.set('creating_new_item', true);
		Session.set('pending_item_index', 0);
	},
	getCurrentApprovalItemFromDetails : function() {
		var itemContents = this.getDynamicContentFromDetails();
		return {
			contents : itemContents,
			scheduled_time : Session.get('current_scheduled_time'),
			content_type : Session.get('current_content_type'),
			scope : 'internal',
			status : 'submitted',
			created_time : moment().format("X") * 1000,
			client_id : Session.get('selected_client_id'),
			type : Session.get('current_network_type'),
			time_to_post : Session.get('time_to_post'),
		};
	},
	getDynamicContentFromDetails : function() {
		var clickableInputs = Session.get('clickable_inputs');
		var itemContents = {};
		_.map(clickableInputs, function(clickableInput){
			itemContents[clickableInput.id] = clickableInput.text;
		});
		var uploadedImageURL = Session.get('uploaded_image_url');
		var imageURL = null;
		if(Session.get('creating_new_item')) {
			imageURL = uploadedImageURL;
		} else {
			imageURL = uploadedImageURL == null ? Session.get('current_item_contents').image_url : uploadedImageURL;
		}
		
		if(imageURL != null) {
			itemContents.image_url = imageURL;
		}
		itemContents.time_to_post = Session.get('time_to_post');
		return itemContents;
	},
	initializeAccordion : function() {
		Meteor.defer(function(){
			$('.creation-accordion').accordion();
		});
	},
	setDefaultsOnShow : function(context, creatingNewItem) {
		Session.set('tweet_length', null);
		Session.set('edited_input_id', null);
		Session.set('time_to_post', null);
		Session.set('editing_time', true);
		Session.set('uploaded_image_url', null);
		Session.set('current_item_id', context._id);
		Session.set('current_scope', context.scope);
		Session.set('current_content_type', null);
		Session.set('current_network_type', null);
		Session.set('current_scheduled_time', context.day.scheduled_time);
		Session.set('creating_new_item', creatingNewItem);
		var currentItemContents = creatingNewItem ? {} : context.contents;
		Session.set('current_item_contents', currentItemContents);
	},
	configureDetailsForNewItem: function(context) {
		Session.set('time_to_post', context.time_to_post);
		if(context.time_to_post != null) {
			Session.set('editing_time', false);
		}
		Session.set('current_network_type', context.type);
		Session.set('current_content_type', context.content_type);
		Session.set('time_to_post', context.time_to_post);
		inputBuilder.initializeClickableInputs();
	},
	closeShownPopup : function() {
		$('#' + Session.get('shown_popup_id')).popup('hide');
	},
	getWidthClass : function() {
		return Session.get('current_network_type') != null ? Session.get('current_network_type') + '-width' : 'facebook-width';
	}
	
	
};