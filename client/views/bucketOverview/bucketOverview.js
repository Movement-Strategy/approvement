Template['bucketOverview'].helpers({
	summarized_buckets : function() {
		return customClientHandler.getCustomSummarizedBuckets();	
	},
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

