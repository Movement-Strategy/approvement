
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

keyStrokeHandler.types('window',{
	settings_window : {
		on_enter_down : function(event, context) {
			settingsWindowHandler.passAlongKeyEvent('on_enter_down', event, context, function(type){
				settingsWindowHandler.hide();
			});
		},
		on_escape_down : function(event, context) {
			settingsWindowHandler.passAlongKeyEvent('on_escape_down', event, context, function(type){
				settingsWindowHandler.hide();
			});
		},
	},
});




