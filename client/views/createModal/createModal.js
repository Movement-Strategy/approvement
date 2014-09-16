resetModalContent = function() {
	Session.set('uploaded_image_url', null);
	Session.set('current_item_contents', {});
	Session.set('current_network_type', null);
	Session.set('current_content_type', null);
	Session.set('creating_new_item', true);
	Session.set('pending_item_index', 0);
}

showCreationModal = function() {
	Session.set('details_shown', true);
};

hideCreationModal = function() {
	emptyCommentInput();
	Session.set('details_shown', false);
};

getDynamicContentFromModal = function() {
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
}

getCurrentApprovalItemFromModal = function() {
	var itemContents = getDynamicContentFromModal();
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
};


Template['createModal'].helpers({
	modal_shown : function() {
		return Session.get('modal_shown');
	},
	creating_new_item : function() {
		return Session.get('creating_new_item');
	},
 	is_content_type_chosen : function() {
		return Session.get('current_content_type') != null;
	},
});

Template['createModal'].events({
});

