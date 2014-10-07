
statusColorMap = {
	approved : 'green',
	rejected : 'red',
	submitted : 'grey',
	commented : 'orange',
};

Template['calendarDay'].helpers({
	is_today_class : function() {
		return this.day.is_today && !calendarBuilder.dayIsDraggedOver(this) ? 'is-today' : '';
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
	'dragover .calendar-day' : function(event) {
		calendarBuilder.onDraggedOver(event);
	},
	'dragleave .calendar-day' : function(event) {
		calendarBuilder.onDragLeave();
		event.preventDefault();
	},
	'drop .calendar-day' : function(event) {
		calendarBuilder.onDrop(event);
	}
});

