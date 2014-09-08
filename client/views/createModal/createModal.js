resetModalContent = function() {
	Session.set('uploaded_image_url', null);
	Session.set('current_item_contents', {});
	Session.set('current_network_type', null);
	Session.set('current_content_type', null);
	Session.set('creating_new_item', true);
}
prepareModalToShow = function(context, creatingNewItem){
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
	if(!creatingNewItem) {
		Session.set('time_to_post', context.time_to_post);
		if(context.time_to_post != null) {
			
			Session.set('editing_time', false);
		}
		Session.set('current_network_type', context.type);
		Session.set('current_content_type', context.content_type);
		Session.set('time_to_post', context.time_to_post);
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

initializeClickableInputs = function() {
	
	var inputMap = {
		facebook : {
			description : {
				default_text : 'Choose some text for the post',
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
				default_text : "Choose some text for your tweet",
				style_class : 'twitter-body',
			},
		},
		instagram : {
			instagram_caption : {
				default_text : "The caption you would like to included with your instagram post",
				style_class : '',
			},
		},
	};
	
	var inputs =  {
		facebook : {
			link : [
				'link_body',
				'link_text',
				'description',
			],
			photo : [
				'description',
			],
			status : [
				'description',
			],
		},
		twitter : {
			with_picture : [
				'tweet_body',
			],
			without_picture : [
				'tweet_body',
			],
		},
		instagram : {
			standard : [
				'instagram_caption'
			],
		},
	};
	
	var processedInputs = {};
	var currentItemContents = Session.get('current_item_contents');

	var networkType = Session.get('current_network_type');
	var contentType = Session.get('current_content_type');
	_.map(inputs[networkType][contentType], function(inputName){
		var input = inputMap[networkType][inputName];
		input.text = _.has(currentItemContents, inputName) ? currentItemContents[inputName] : input.default_text;
		input.id = inputName;
		processedInputs[inputName] = input;
	});
	
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

