intervalHandler = {
	
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
};