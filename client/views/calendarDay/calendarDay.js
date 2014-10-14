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
		if(calendarBuilder.dayIsDraggedOver(this)) {
			return calendarBuilder.plusIsDraggedOver() ? 'dragged-over-plus' : 'dragged-over';
		} else {
			return '';
		}
	},
	initializeDroppable : function() {
		
		Meteor.defer(function(){
			$('.calendar-day').droppable({
				drop : function(event, ui) {
					if(!calendarBuilder.plusIsDraggedOver()) {
						calendarBuilder.onDrop(event);
					}
				},
				over : function(event, ui) {
					calendarBuilder.onDragEnter(event);
				},
				out : function(event, ui) {
					calendarBuilder.onDragExit(event);
				}
			});
			
			$('.create-item-button').droppable({
				over : function(event, ui) {
					calendarBuilder.onDragOverPlusButton();
				},
				out : function(event, ui) {
					calendarBuilder.onDragExitPlusButton();				
				},
				drop : function(event, ui) {
					calendarBuilder.onDropOverPlusButton();
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

