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
	onDropdownChange : function(value, text, element) {
		Session.set('bucket_repeat_interval', value);
	},
	initializeDropdowns : function() {
		var bucket = Session.get('current_content_bucket');
		var repeatInterval = _.has(bucket, 'repeat_interval') ? bucket['repeat_interval'] : 'weekly';
		$('.interval-dropdown').dropdown('set selected', repeatInterval).dropdown('setting', {onChange : function(value, text){
			intervalHandler.onDropdownChange(value, text, this);
		}});
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
	bucketWasCreatedAfterCurrentWeek : function(bucket) {
		if(bucket.week == timeHandler.getWeekForSelectedTime()) {
			// include this week
			return true;
		} else {
			var bucketCreatedObject = timeHandler.dateStringToObject(bucket.week);
			var currentWeekObject = timeHandler.getCurrentDateObject();
			return currentWeekObject.isAfter(bucketCreatedObject); 
		}
	},
	bucketMatchesCurrentInterval : function(bucket) {
		
		var startWeekForBucket = bucket.week;
		var matches = false;
		
		if(!bucket.repeats) {
			matches = true;
		}
		
		if(_.has(bucket, 'repeat_interval') && this.bucketWasCreatedAfterCurrentWeek(bucket)) {
			var interval = bucket['repeat_interval'];
			var startWeekForBucket = bucket.week;
			matches = intervalHandler.intervalMap[interval]['matches'](startWeekForBucket);
		}
		return matches;
	},
};