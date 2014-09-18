handleNetworkWithSingleContentType = function() {
	if(contentTypeBuilder.hasOnlyOneContentType()) {
		var contentTypes = contentTypeBuilder.networkTypeMap[Session.get('current_network_type')];
		Session.set('current_content_type', contentTypes[0].value);
		inputBuilder.initializeClickableInputs();
	}
}

Template['networkTypeDropdown'].helpers({
	initialize : function() {
		Meteor.defer(function(){
			$('.network-type-dropdown').dropdown();
		});
	},
});

Template['networkTypeDropdown'].events({
	'change .network-type-dropdown' : function(event) {
		Session.set('current_network_type', event.target.value);
		Session.set('current_content_type', null);
		inputBuilder.initializeClickableInputs();
		handleNetworkWithSingleContentType();
	},
});

