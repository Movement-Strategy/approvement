Template['contentCalendar'].helpers({
	calendar_days : function() {
		
		// maps a status to the color that's going to be displayed
		calendarDays = Session.get('calendar_days');
		return calendarDays;
	} 
});

Template['contentCalendar'].events({
});

