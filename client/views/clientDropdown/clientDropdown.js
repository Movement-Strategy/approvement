Template['clientDropdown'].helpers({
	initialize : function() {
		Meteor.defer(function(){
			$('.client-type-dropdown').dropdown();
		});
	},
});

Template['clientDropdown'].events({
});

