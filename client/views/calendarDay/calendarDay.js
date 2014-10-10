
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
					$(ui.draggable[0]).draggable('option', 'revert', false);
					
					calendarBuilder.onDrop(event);
				},
				out : function(event, ui) {
					$(ui.draggable[0]).draggable('option', 'revert', true);
				},
				over : function(event, ui) {
					$(ui.draggable[0]).draggable('option', 'revert', false);
					calendarBuilder.onDragEnter(event);
				}
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

