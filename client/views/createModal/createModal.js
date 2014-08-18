prepareModalToShow = function(context, creatingNewItem){
	Session.set('current_scheduled_time', context.day.scheduled_time);
	Session.set('creating_new_item', creatingNewItem);
	var currentItemContents = creatingNewItem ? {} : context.contents;
	Session.set('current_item_contents', currentItemContents);
	showCreationModal();
};

showCreationModal = function() {
	initializeClickableInputs();
	$('.create-item').modal('show');
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
		scope : 'internal',
		status : 'submitted',
		created_time : moment().format("X") * 1000,
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
});

Template['createModal'].events({
	'click .submit.button' : function() {
		var approvalItem = getCurrentApprovalItemFromModal();
		Meteor.call('insertApprovalItem', approvalItem);
	},
	'change .network-type-dropdown' : function(event) {
		Session.set('current_network_type', event.target.value);
	},
});

