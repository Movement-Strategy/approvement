
statusColorMap = {
	approved : 'green',
	rejected : 'red',
	submitted : 'grey',
	commented : 'orange',
};

Template['calendarDay'].helpers({
	is_today_class : function() {
		return this.day.is_today ? 'is-today' : '';
	},
	updateReactiveVariables : function() {
		commentHandler.setCommentsFromDayContext(this);
	},
	day : function() {
		return calendarBuilder.getDayFromContext(this);
	},
	drag_class : function() {
		return calendarBuilder.dayIsDraggedOver(this) ? 'dragged-over' : '';
	}
	
});

Template['calendarDay'].events({
	'click .create-item-button' : function(event) {
			var creatingNew = true;
			detailsHandler.showDetails(this, creatingNew);
	},
	'dragenter .calendar-day' : function(event) {
		calendarBuilder.onDragEnter(event);
	},
	'dragover .calendar-day' : function(event) {
		event.preventDefault();
	},
	'dragleave .calendar-day' : function(event) {
		event.preventDefault();
	},
	'drop .calendar-day' : function(event) {
		event.preventDefault();
	}
});

