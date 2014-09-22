
Template['contentTypeDropdown'].helpers({
	content_types : function() {
		return contentTypeBuilder.getContentTypes();
	},
	initialize : function() {
		contentTypeBuilder.initializeDropdown();
	},
	network_type_is_chosen : function() {
		return networkTypeBuilder.networkTypeChosen();
	}
});

Template['contentTypeDropdown'].events({
	'change .content-type-dropdown' : function(event) {		
		Session.set('current_content_type', event.target.value);
		inputBuilder.initializeClickableInputs();
	},
});

