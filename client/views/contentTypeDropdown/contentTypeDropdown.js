networkTypeMap = {
	facebook : [
		{
			display : "Link",
			value : "link",
		},
		{
			display : "Status",
			value : "status",
		},
	],
};

var getContentTypes = function() {
	
	contentTypes = [];
	var networkType = Session.get('current_network_type');
	if(networkType != null) {
		contentTypes = networkTypeMap[networkType];
	}
	Meteor.defer(function(){
		$('.content-type-dropdown').dropdown();
	}); 
	return contentTypes;
};

Template['contentTypeDropdown'].helpers({
	show_state : function() {
		return Session.get('current_network_type') != null ? '' : 'hidden';
	},
	content_types : function() {
		return getContentTypes();
	},
});

Template['contentTypeDropdown'].events({
	'change .content-type-dropdown' : function(event) {		
		Session.set('current_content_type', event.target.value);
	},
});

