
Template['contentTypeDropdown'].helpers({
	content_types : function() {
		contentTypeBuilder.initializeDropdown();
		return contentTypeBuilder.getContentTypes();
	},
	network_type_is_chosen : function() {
		return networkTypeBuilder.networkTypeChosen();
	}
});

Template['contentTypeDropdown'].events({
	'click .content-type-item' : function(event) {
		Session.set('current_content_type', $(event.currentTarget).attr('data-value'));
		inputBuilder.initializeClickableInputs();
	},
});

