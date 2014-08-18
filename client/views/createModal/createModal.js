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
}

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
	_.map(inputs, function(input, key){
		
		input.text = input.default_text;
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
		return Session.get('uploaded_image_url') == null ? "http://lorempixel.com/476/246/" : Session.get('uploaded_image_url');
	}
});

Template['createModal'].events({
	'click .submit.button' : function() {
		var approvalItem = getCurrentApprovalItemFromModal();
		Meteor.call('insertApprovalItem', approvalItem);
	}
});

