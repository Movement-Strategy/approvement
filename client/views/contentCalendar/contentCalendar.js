Template['contentCalendar'].helpers({
	calendar_days : function() {
		// maps a status to the color that's going to be displayed
		return calendarBuilder.getCalendarDays();
	},
	details_shown : function() {
		return detailsHandler.detailsShown();
	},
	is_not_client : function() {
		return !userHandler.userIsType('client');
	},
	show_class : function() {
		return detailsHandler.detailsShown() ? 'hidden' : '';
	},
	initializeDroppables : function() {
		Meteor.defer(function(){
			$('.forward.arrow.column').droppable({
				over : function() {
					calendarBuilder.onDragOverArrowColumn(event, 'forward');
					calendarBuilder.intervalHandler = Meteor.setInterval(function(){
						calendarBuilder.onDragOverArrowColumn(event, 'forward');
					}, 750);
				},
				out : function() {
					calendarBuilder.stopChangingDates();
				}
			});
			$('.back.arrow.column').droppable({
				over : function() {
					calendarBuilder.onDragOverArrowColumn(event, 'back');
					calendarBuilder.intervalHandler = Meteor.setInterval(function(){
						calendarBuilder.onDragOverArrowColumn(event, 'back');
					}, 750);
				},
				out : function() {
					calendarBuilder.stopChangingDates();
				}
			});	
		});
	},
});

Template['contentCalendar'].events({
	'click .right.arrow' : function(event) {
		timeHandler.changeToNextWeek();
	},
	'click .left.arrow' : function(event) {
		timeHandler.changeToLastWeek();
	},	
});

