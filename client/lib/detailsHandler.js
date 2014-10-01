detailsHandler = {
	isPreviewShown : function() {
		var isPreviewShown = false;
		if(contentTypeBuilder.isType('link')) {
			isPreviewShown = facebookHandler.linkEntered();
		} else {
			isPreviewShown = contentTypeBuilder.isContentTypeChosen();
		}
		return isPreviewShown;
	},
	showDropdowns : function() {
		if(contentTypeBuilder.isType('link')) {
			return false;
		} else {
			return !this.isPreviewShown() && this.creatingNewItem();
		}
	},
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
		if(Session.get('changes_made')) {
			promptModalHandler.show('exit_asset');
		} else {
			this.onHideDetails();
		}
		
	},
	onHideDetails : function() {
		commentHandler.emptyCommentInput();
		Session.set('details_shown', false);
	},
	getDynamicContents : function() {
		itemContents = this.getDynamicContentFromDetails();
		return itemContents;		
	},
	onCreatingNewItem : function(itemContents) {
		var approvalItem = this.generateNewApprovalItemFromContents(itemContents);
		Meteor.call('insertApprovalItem', approvalItem);
		
		// because we're creating a new item, we dont' need to worry about changes being made
		Session.set('changes_made', false);
		detailsHandler.hideDetails();
	},
	handleUpdate : function(userTypeDetails) {
		contents = detailsHandler.getDynamicContents();
		if(Session.get('creating_new_item')) {
			detailsHandler.onCreatingNewItem(contents);
		} else {
			detailsHandler.onUpdatingExistingItem(contents, userTypeDetails);
		}
	},
	onUpdatingExistingItem : function(contents, userTypeDetails) {
		var dynamicContentsUpdated = false;
		if(_.has(userTypeDetails, 'contents')) {
			userTypeDetails['contents'] = contents;
			dynamicContentsUpdated = true;
		}
		userTypeDetails = this.addTimeToPostToUserTypeDetails(userTypeDetails);
		Meteor.call('updateStatus', Session.get('current_item_id'), userTypeDetails);
		this.afterUpdate(contents, dynamicContentsUpdated);
	},
	addTimeToPostToUserTypeDetails : function(userTypeDetails) {
		var timeToPost = Session.get('time_to_post');
		if(timeToPost != null) {
			userTypeDetails['time_to_post'] = timeToPost;
		}
		return userTypeDetails;
	},
	afterUpdate : function(contents, dynamicContentsUpdated) {
		Session.set('changes_made', false);
		detailsHandler.hideDetails();
		// the pop up module in semantic ui has issues resetting correctly when content changes
		// so were manually setting the items to be empty and flushing the system so that they can reset
		if(dynamicContentsUpdated) {
			this.resetContentToResetPopups();
		}
	},
	resetContentToResetPopups : function() {
		Session.set('reset_items', true);
		Meteor.flush();
		Session.set('reset_items', false);
		Meteor.flush();
	},
	generateNewApprovalItemFromContents : function(itemContents) {
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
		itemContents = this.addImageURLToDynamicContent(itemContents);
		return itemContents;
	},
	addImageURLToDynamicContent : function(itemContents) {
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
		return itemContents;
	},
	resetDetailsContent : function() {
		Session.set('uploaded_image_url', null);
		Session.set('current_item_contents', {});
		Session.set('current_network_type', null);
		Session.set('current_content_type', null);
		Session.set('creating_new_item', true);
		Session.set('pending_item_index', 0);
	},
	initializeAccordion : function() {
		Meteor.defer(function(){
			$('.creation-accordion').accordion();
		});
	},
	setDefaultsOnShow : function(context, creatingNewItem) {
		Session.set('tweet_length', null);
		Session.set('changes_made', false);
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
		$('#' + Session.get('shown_popup_id')).popup('remove');
	},
	getWidthClass : function() {
		return Session.get('current_network_type') != null ? Session.get('current_network_type') + '-width' : 'facebook-width';
	}
	
	
};