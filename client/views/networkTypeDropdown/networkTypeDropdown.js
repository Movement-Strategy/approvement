hasOnlyOneContentType = function() {
	if(Session.get('current_network_type') != null) {
		var contentTypes = networkTypeMap[Session.get('current_network_type')];
		return contentTypes.length == 1;
	} else {
		return false;
	}
}

handleNetworkWithSingleContentType = function() {
	if(hasOnlyOneContentType()) {
		var contentTypes = networkTypeMap[Session.get('current_network_type')];
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

