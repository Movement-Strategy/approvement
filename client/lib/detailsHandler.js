detailsHandler = {
	isPreviewShown : function() {
		var isPreviewShown = false;
		if(contentTypeBuilder.isType('link')) {
			
			// if this is an item that existed before links were required, 
			// show the preview by default
			// otherwise, require that a link be entered before showing the preview
			if(facebookHandler.isLegacyLink()) {
				return true;
			} else {
				isPreviewShown = facebookHandler.linkEntered();
			}
			
		} else {
			isPreviewShown = contentTypeBuilder.isContentTypeChosen();
		}
		return isPreviewShown;
	},
	getEnterPressState : function() {
		return Session.get('current_scope') == 'private' ? 'edited' : 'updated';
	},
	imageIsLoading : function() {
		return Session.get('image_is_loading');	
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
		context = this.fillInMissingContextData(context);
		this.closeShownPopup();
		this.setDefaultsOnShow(context, creatingNewItem);
		if(!creatingNewItem) {
			this.configureDetailsForExistingItem(context);
		}
		Session.set('details_shown', true);
	},
	fillInMissingContextData : function(context) {
		// if we're coming from a route, where we don't have access to the context
		// we need to fill in data
		if(!_.has(context, 'type')) {
			var calendarDays = Session.get('calendar_days');
			_.map(calendarDays, function(calendarDay){
				if(_.has(calendarDay, 'approval_items')) {
					var approvalItems = [];
					var allApprovalItems = calendarDay['approval_items'];
					var approvalItems = _.flatten(calendarDay['approval_items']);
					foundItem = _.find(approvalItems, function(item){
						return item['_id'] == context['_id'];
					});
					if(foundItem) {
						context = foundItem;
					}
				}
			});
		}
		return context;	
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
		Session.set('item_to_copy', null);
		Session.set('details_shown', false);
		Session.set('approval_item_context', null);
		var clientID = Session.get('selected_client_id');
		var weekID = timeHandler.getWeekForSelectedTime();
		calendarBuilder.goToNewWeek(clientID, weekID);
	},
	deleteRelatedContentIfNeeded : function() {
		if(this.creatingNewItem()) {
			var itemID = Session.get('current_item_id');
			Meteor.call('removeAllAssetsForApprovalItem', itemID);
			Meteor.call('removeAllCommentsForApprovalItem', itemID);
		}
	},
	getDynamicContents : function() {
		itemContents = this.getDynamicContentFromDetails();
		return itemContents;		
	},
	onBack : function() {
		this.deleteRelatedContentIfNeeded();
		this.hideDetails();
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
			_id : Session.get('current_item_id'),
			contents : itemContents,
			scheduled_time : Session.get('current_scheduled_time'),
			content_type : Session.get('current_content_type'),
			scope : 'private',
			status : 'created',
			created_by : Meteor.userId(),
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
		itemContents = this.addFacebookLinkToDynamicContent(itemContents);
		return itemContents;
	},
	addFacebookLinkToDynamicContent : function(itemContents) {
		var facebookLink = Session.get('current_facebook_link');
		if(facebookLink != null) {
			itemContents['facebook_link'] = facebookLink;
		}	
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
		Session.set('current_facebook_link_data', {});
		Session.set('current_facebook_link', null);
		Session.set('editing_link', false);
		Session.set('link_is_loading', false);
		Session.set('tweet_length', null);
		Session.set('changes_made', false);
		Session.set('edited_input_id', null);
		Session.set('time_to_post', null);
		Session.set('editing_time', true);
		Session.set('uploaded_image_url', null);
		var itemID = creatingNewItem ? new Meteor.Collection.ObjectID()._str : context._id;
		Session.set('current_item_id', itemID);
		Session.set('current_scope', context.scope);
		Session.set('current_day', context.day);
		Session.set('current_content_type', null);
		Session.set('current_network_type', null);
		Session.set('current_scheduled_time', context.day.scheduled_time);
		Session.set('creating_new_item', creatingNewItem);
		var copiedItemContents = Session.get('item_to_copy') != null ? Session.get('item_to_copy').contents : {};
		var currentItemContents = creatingNewItem ? {} : context.contents;
		
		if(_.has(currentItemContents, 'facebook_link')) {
			Session.set('current_facebook_link', currentItemContents.facebook_link);
		}
		
		// set the facebook link from the copied item contents
		if(_.has(copiedItemContents, 'facebook_link')) {
			Session.set('current_facebook_link', copiedItemContents.facebook_link);
		}
				
		Session.set('current_item_contents', currentItemContents);
	},
	configureDetailsForExistingItem: function(context) {
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