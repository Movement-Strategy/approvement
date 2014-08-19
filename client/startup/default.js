Meteor.startup(function () {
	Session.setDefault('approval_items_are_ready', false);
	var dateObject = new Date().add;
	var momentDate = moment(dateObject);
	Session.setDefault('current_item_contents', {});
	Session.setDefault('approval_items_by_day', {});
	Session.setDefault('current_network_type', null);
	Session.setDefault('current_content_type', null);
	initializeClickableInputs();
	setCurrentDays(momentDate);
	approvalActionHandler.getActionButtons();
});