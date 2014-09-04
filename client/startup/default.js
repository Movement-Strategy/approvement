Meteor.startup(function () {
	Session.setDefault('show_popups', false);
	Session.setDefault('approval_items_are_ready', false);
	Session.set('clients_are_ready', false);
	Session.setDefault('page_is_ready', false);
	Session.setDefault('details_shown', false);
	confirmPageIsReady();
	var dateObject = new Date().add;
	momentDate = moment(dateObject);
	Session.setDefault('current_item_contents', {});
	Session.setDefault('approval_items_by_day', {});
	Session.setDefault('current_clients', []); 
	Session.setDefault('clients_by_id', {});
	Session.setDefault('current_network_type', null);
	Session.setDefault('current_content_type', null);
	Session.setDefault('selected_client', false);
	Session.setDefault('details_can_close', true);
	setCurrentDays(momentDate);
});