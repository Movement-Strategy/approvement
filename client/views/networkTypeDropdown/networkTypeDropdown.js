Template['networkTypeDropdown'].helpers({
	initialize : function() {
		Meteor.defer(function(){
			console.log('firing');
			$('.network-type-dropdown').dropdown();
		});
	},
	network_type_is_chosen : function() {
		return Session.get('network_type') != null;
	}
});

Template['networkTypeDropdown'].events({

});

