resetModalContent = function() {
	Session.set('uploaded_image_url', null);
}
prepareModalToShow = function(context, creatingNewItem){
	Session.set('current_item_id', context._id);
	Session.set('current_scope', context.scope);
	Session.set('current_scheduled_time', context.day.scheduled_time);
	Session.set('creating_new_item', creatingNewItem);
	var currentItemContents = creatingNewItem ? {} : context.contents;
	Session.set('current_item_contents', currentItemContents);
	if(!creatingNewItem) {
		Session.set('current_network_type', context.type);
		Session.set('current_content_type', context.content_type);
	}
	showCreationModal();
};

showCreationModal = function() {
	initializeClickableInputs();
	$('.create-item').modal('show');
	Session.set('modal_shown', true);
};

hideCreationModal = function() {
	$('.create-item').modal('hide');
	Session.set('modal_shown', false);
	Session.set('current_comments', []);
};


getCurrentApprovalItemFromModal = function() {
	var clickableInputs = Session.get('clickable_inputs');
	var itemContents = {};
	_.map(clickableInputs, function(clickableInput){
		itemContents[clickableInput.id] = clickableInput.text;
	});
	itemContents.image_url = Session.get('uploaded_image_url');
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
	var inputs =  {
		link_description : {
			default_text : 'Overview for link',
		},
		link_body : {
			default_text : 'Title Included with Link',
		},
		link_text : {
			default_text : 'Detailed Link Description',
		},
	};
	var processedInputs = {};
	var currentItemContents = Session.get('current_item_contents');
	
	_.map(inputs, function(input, key){
		input.text = _.has(currentItemContents, key) ? currentItemContents[key] : input.default_text;
		input.id = key;
		processedInputs[key] = input;
	});
	Session.set('clickable_inputs', processedInputs);
};

Template['createModal'].helpers({
	clickable_inputs : function() {
		return Session.get('clickable_inputs');
	},
	initializeModal : function() {
		var test = Session.get('current_content_type');
		Meteor.defer(function(){
			$('.create-item').modal({detachable : false});
			$('.create-item').modal('refresh');
		}); 
	},
	modal_shown : function() {
		return Session.get('modal_shown');
	},
	image_url : function() {
		currentItemContents = Session.get('current_item_contents');
		currentURL = _.has(currentItemContents, 'image_url') ? currentItemContents['image_url'] : "http://lorempixel.com/476/246/";
		return Session.get('uploaded_image_url') == null ? currentURL : Session.get('uploaded_image_url');
	},
	creating_new_item : function() {
		return Session.get('creating_new_item');
	},
 	is_content_type_chosen : function() {
		return Session.get('current_content_type') != null;
	},
	profile_pic_url : function() {
		return Session.get('selected_client').profile_pictures.facebook;
	},
	display_name : function() {
		return Session.get('selected_client').display_name;
	}
});

Template['createModal'].events({
	'click .submit.button' : function() {
		var approvalItem = getCurrentApprovalItemFromModal();
		Meteor.call('insertApprovalItem', approvalItem);
		hideCreationModal();
	},
	'click .reject.button' : function() {
		stateManager.changeToState('rejected');
	},
	'click .approve.button' : function() {
		stateManager.changeToState('approved');
	},
	'click .comment.button' : function() {
		stateManager.changeToState('commented');
	},
	'click .update.button' : function() {
		stateManager.changeToState('updated');
	},
	'change .network-type-dropdown' : function(event) {
		Session.set('current_network_type', event.target.value);
	},
});

