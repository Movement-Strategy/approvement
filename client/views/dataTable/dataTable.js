Template['dataTable'].helpers({
	header_text : function() {
		return dataTableHandler.getHeaderText();	
	},
});

Template['dataTable'].events({
	'click .icon.last-week' : function() {
		timeHandler.changeToLastWeek();
	},
	'click .icon.next-week' : function() {
		timeHandler.changeToNextWeek();
	},
});

keyStrokeHandler.types('window', {
	data_table : {
		on_right_down : function(event, context) {
			event.preventDefault();
			dataTableHandler.passAlongKeyEvent('on_right_down', event, context, function(type){
				timeHandler.changeToNextWeek();
			});
		},
		on_left_down : function(event, context) {
			event.preventDefault();
			dataTableHandler.passAlongKeyEvent('on_left_down', event, context, function(type){
				timeHandler.changeToLastWeek();
			});
		},
	},
});


