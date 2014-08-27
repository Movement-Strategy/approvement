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
	},
});

