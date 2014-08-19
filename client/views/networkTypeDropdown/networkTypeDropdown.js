Template['networkTypeDropdown'].helpers({
	initialize : function() {
		Meteor.defer(function(){
			console.log('firing');
			$('.network-type-dropdown').dropdown();
		});
	},
});

Template['networkTypeDropdown'].events({

});

