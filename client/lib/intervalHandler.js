intervalHandler = {
	
	intervalMap : {
		monthly : {
			matches : function(startWeek) {
				return intervalHandler.isMonthly(startWeek);
			},
		},
		weekly : {
			matches : function(startWeek) {
				return true;
			}
		},
		bi_weekly : {
			matches : function(startWeek) {
				return intervalHandler.isBiWeekly(startWeek);
			}
		},
		
	},
	getAdjustedWeekOfMonth: function(week) {
		var dateObject = timeHandler.dateStringToObject(week);
		var weekOfMonth = dateObject.monthWeek();
		var startOfMonthObject = dateObject.date(1);
		var startOfMonthDay = startOfMonthObject.weekday();
		return startOfMonthDay > 1 ? weekOfMonth - 1 : weekOfMonth;
	},
	isMonthly : function(startWeek) {
		var currentWeek = timeHandler.getWeekForSelectedTime();
		var startIndex = intervalHandler.getAdjustedWeekOfMonth(startWeek);
		var endIndex = intervalHandler.getAdjustedWeekOfMonth(currentWeek);
		return endIndex == startIndex;
	},
	isBiWeekly : function(startWeek) {
		var currentDateObject = timeHandler.getCurrentDateObject();
		var startWeekObject = timeHandler.dateStringToStartOfWeekDateObject(startWeek);
		var interval = startWeekObject.recur().every(2, "weeks");
		return interval.matches(currentDateObject);
	},
	filterContentBucketsBasedOnInterval : function(contentBuckets) {
		return _.filter(contentBuckets, function(bucket){
			return intervalHandler.bucketMatchesCurrentInterval(bucket);
		});
	},
	bucketMatchesCurrentInterval : function(bucket) {
		var interval = 'monthly';
		var startWeekForBucket = bucket.week;
		return intervalHandler.intervalMap[interval]['matches'](startWeekForBucket);
	},
};