
Template['contentTypeDropdown'].helpers({
	content_types : function() {
		return contentTypeBuilder.getContentTypes();
	},
	initialize : function() {
		Meteor.defer(function(){
			$('.content-type-dropdown').dropdown();
		});
	},
	network_type_is_chosen : function() {
		return Session.get('current_network_type') != null;
	}
});

Template['contentTypeDropdown'].events({
	'change .content-type-dropdown' : function(event) {		
		Session.set('current_content_type', event.target.value);
		inputBuilder.initializeClickableInputs();
	},
});

