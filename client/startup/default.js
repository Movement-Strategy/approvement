Meteor.startup(function () {
	Session.setDefault('approval_items_are_ready', false);
	var dateObject = new Date().add;
	var momentDate = moment(dateObject);
	
	Session.setDefault('approval_items_by_day', {});
	initializeClickableInputs();
	setCurrentDays(momentDate);
	
	
	
	
});