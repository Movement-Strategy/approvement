Template['notificationModal'].helpers({
	initializeCheckboxes : function() {
		Meteor.defer(function(){
		$('.notification-check').checkbox();
		});
	}
});

Template['notificationModal'].events({
	'click .send.button' : function(event, template) {
		var selectedItems = template.findAll( "input[type=checkbox]:checked");
		var selectedValues = _.map(selectedItems, function(selectedItem){
			return selectedItem.defaultValue;
		});
		console.log(selectedValues);
	}
});

