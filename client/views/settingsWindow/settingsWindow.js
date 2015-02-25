
Template['settingsWindow'].helpers({
	details_shown : function() {
		return detailsHandler.detailsShown();
	},
	show_class : function() {
		return detailsHandler.detailsShown() ? '' : 'hidden';
	},
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

