networkTypeMap = {
	facebook : [
		{
			display : "Link",
			value : "link",
		},
		{
			display : "Photo",
			value : "photo",
		},
	],
	twitter : [
		{
			display : "Standard",
			value : 'without_picture',
		},
		{
			display : "With Twit-pic",
			value : 'with_picture',
		},
	],
	instagram : [
		{
			display : "Standard",
			value : 'standard',
		}
	],
};

var getContentTypes = function() {
	
	contentTypes = [];
	var networkType = Session.get('current_network_type');
	if(networkType != null) {
		contentTypes = networkTypeMap[networkType];
	}
	return contentTypes;
};

Template['contentTypeDropdown'].helpers({
	content_types : function() {
		return getContentTypes();
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
		initializeClickableInputs();
	},
});

