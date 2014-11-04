
Template['contentTypeDropdown'].helpers({
	content_types : function() {
		contentTypeBuilder.initializeDropdown();
		return contentTypeBuilder.getContentTypes(Session.get('current_network_type'));
	},
	network_type_is_chosen : function() {
		return networkTypeBuilder.networkTypeChosen();
	}
});

Template['contentTypeDropdown'].events({
	'click .content-type-item' : function(event) {
		contentTypeBuilder.onClickContentType(event);
	},
});

