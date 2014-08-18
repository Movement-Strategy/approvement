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
});

Template['createModal'].events({
	'click .link-image' : function(){
		console.log('click');
	},
});

