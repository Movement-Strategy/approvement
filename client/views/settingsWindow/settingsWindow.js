
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
				console.log('default call');
			});
		},
		on_escape_down : function(event, context) {
			settingsWindowHandler.passAlongKeyEvent('on_escape_down', event, context, function(type){
				settingsWindowHandler.hide();
			});
		},
		on_tab_down : function () {
			console.log('tab');	
		},
		on_right_down : function() {
			console.log('right');	
		},
		on_left_down : function() {
			console.log('left');	
		},
		on_shift_down : function() {
			console.log('shift');	
		},
		on_key_down : function() {
			console.log('key');	
		},
	},
});




