Template['bucketOverview'].helpers({
	week : function() {
		return timeHandler.getWeekForSelectedTime();	
	},
});

Template['bucketOverview'].events({
	'click .icon.last-week' : function() {
		timeHandler.changeToLastWeek();
	},
	'click .icon.next-week' : function() {
		timeHandler.changeToNextWeek();
	},
});

