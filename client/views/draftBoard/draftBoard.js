
Template['draftBoard'].helpers({
	week : function() {
		return timeHandler.getWeekForSelectedTime();	
	},
});

Template['draftBoard'].events({
	'click .icon.last-week' : function() {
		timeHandler.changeToLastWeek();
	},
	'click .icon.next-week' : function() {
		timeHandler.changeToNextWeek();
	},
});

