handleNetworkWithSingleContentType = function() {
	var contentTypes = networkTypeMap[Session.get('current_network_type')];
	if(contentTypes.length == 1) {
		Session.set('current_content_type', contentTypes[0].value);
		initializeClickableInputs();
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
		initializeClickableInputs();
		handleNetworkWithSingleContentType();
	},
});

