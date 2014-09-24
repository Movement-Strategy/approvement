Template['timePicker'].helpers({
	is_time_selected : function() {
		return timeHandler.isTimeSelected();
	},
	time_to_post : function() {
		return timeHandler.getTimeToPost();
	},
	initializePicker : function() {
		timeHandler.initializeTimePicker();
	},
});

Template['timePicker'].events({
	'click .scheduled-time' : function() {
		return timeHandler.pickerIsBeingEditted();
	}
});

