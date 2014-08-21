Template['clientDropdown'].helpers({
	initialize : function() {
		Meteor.defer(function(){
			$('.client-dropdown').dropdown();
		});
	},
});

Template['clientDropdown'].events({
});


