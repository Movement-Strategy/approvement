Template['dataTable'].helpers({
	week : function() {
		return timeHandler.getWeekForSelectedTime();	
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

