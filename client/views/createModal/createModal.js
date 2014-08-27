resetModalContent = function() {
	Session.set('uploaded_image_url', null);
	Session.set('current_item_contents', {});
	Session.set('current_network_type', null);
	Session.set('current_content_type', null);
	Session.set('creating_new_item', true);
}
prepareModalToShow = function(context, creatingNewItem){
	Session.set('uploaded_image_url', null);
	Session.set('current_item_id', context._id);
	Session.set('current_scope', context.scope);
	Session.set('current_content_type', null);
	Session.set('current_network_type', null);
	Session.set('current_scheduled_time', context.day.scheduled_time);
	Session.set('creating_new_item', creatingNewItem);
	var currentItemContents = creatingNewItem ? {} : context.contents;
	Session.set('current_item_contents', currentItemContents);
	if(!creatingNewItem) {
		Session.set('current_network_type', context.type);
		Session.set('current_content_type', context.content_type);
		initializeClickableInputs();
	}
	showCreationModal();
};

showCreationModal = function() {
	Session.set('details_shown', true);
};

hideCreationModal = function() {
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
		type : 'facebook',
	};
};

initializeClickableInputs = function() {
	
	var inputMap = {
		facebook : {
			link_description : {
				default_text : 'Overview for link',
				style_class : '',
			},
			link_body : {
				default_text : 'Title Included with Link',
				style_class : 'link-title',
			},
			link_text : {
				default_text : 'Detailed Link Description',
				style_class : 'link-text',
			},
		},
		twitter : {
			tweet_body : {
				default_text : "Text",
				style_class : '',
			},
		},
	};
	
	var inputs =  {
		facebook : {
			link : [
				'link_body',
				'link_text',
				'link_description',
			],
		},
		twitter : {
			with_picture : [
				'tweet_body',
			],
		},
	};
	
	var processedInputs = {};
	var currentItemContents = Session.get('current_item_contents');

	var networkType = Session.get('current_network_type');
	var contentType = Session.get('current_content_type');
	console.log(inputs[networkType][contentType]);
	_.map(inputs[networkType][contentType], function(inputName){
		var input = inputMap[networkType][inputName];
		input.text = _.has(currentItemContents, inputName) ? currentItemContents[inputName] : input.default_text;
		input.id = inputName;
		processedInputs[inputName] = input;
	});
	
	console.log(processedInputs);
	
	Session.set('clickable_inputs', processedInputs);
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

