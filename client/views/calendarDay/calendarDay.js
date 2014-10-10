
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
	},
	initializeDroppable : function() {
		Meteor.defer(function(){
			$('.calendar-day').droppable({
				drop : function(event, ui) {
					calendarBuilder.onDrop(event);
				},
				over : function(event, ui) {
					calendarBuilder.onDragEnter(event);
				},
			});
		});	
	},
	
});

Template['calendarDay'].events({
	'click .create-item-button' : function(event) {
		var creatingNew = true;
		detailsHandler.showDetails(this, creatingNew);
	},
});

