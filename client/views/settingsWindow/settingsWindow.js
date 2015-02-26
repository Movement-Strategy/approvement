
Template['settingsWindow'].helpers({
	header_template : function() {
		return settingsWindowHandler.getHeaderTemplate();
	},
	content_template : function() {
		return settingsWindowHandler.getContentTemplate();
	}
});


Template['settingsWindow'].events({
	'click .back.icon' : function() {
		detailsHandler.onBack();
	},
});

