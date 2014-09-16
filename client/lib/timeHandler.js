timeHandler = {
	getStartOfWeek : function() {
		var currentDays = Session.get('current_days');
		var startOfWeekTime = currentDays[0]['scheduled_time'];
		var dateString = moment(startOfWeekTime).format('DD-MM-YYYY');
		return moment(dateString, 'DD-MM-YYYY');
	},
	alterCurrentDate : function(alterFunction) {
		var startOfWeek = timeHandler.getStartOfWeek();
		startOfWeek = alterFunction(startOfWeek);
		momentDate = startOfWeek;
		calendarBuilder.setCurrentDays(momentDate);
		calendarBuilder.buildAndSetCalendarDays();
		approvalItemBuilder.setItemsByDay();
	},
	changeToNextWeek : function() {
		timeHandler.alterCurrentDate(function(date){
			return date.add('days', 7);
		});
	},
	changeToTargetTime : function(targetTime) {
		timeHandler.alterCurrentDate(function(date){
			var currentTime = date.format('X') * 1000;
			var targetIsBeforeCurrent = targetTime > currentTime; 
			var daysBetween = moment.duration(Math.abs(currentTime - targetTime)).asDays();
			return targetIsBeforeCurrent ? date.add(daysBetween, 'days') : date.subtract(daysBetween, 'days')
		});
	},
	changeToLastWeek : function() {
		timeHandler.alterCurrentDate(function(date){
			return date.subtract('days', 7);
		});
	},
	debugTime : function(time, name) {
		console.log(name + moment(time).format('MMMM Do YYYY, h:mm:ss a'));
	}
	
};