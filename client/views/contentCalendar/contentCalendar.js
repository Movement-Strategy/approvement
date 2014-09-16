alterCurrentDate = function(alterFunction) {
	var startOfWeek = timeHandler.getStartOfWeek();
	startOfWeek = alterFunction(startOfWeek);
	momentDate = startOfWeek;
	calendarBuilder.setCurrentDays(momentDate);
	calendarBuilder.buildAndSetCalendarDays();
	approvalItemBuilder.setItemsByDay();
}

changeToNextWeek = function() {
	alterCurrentDate(function(date){
		return date.add('days', 7);
	});
};

changeToTargetTime = function(targetTime) {
	alterCurrentDate(function(date){
		var currentTime = date.format('X') * 1000;
		var targetIsBeforeCurrent = targetTime > currentTime; 
		var daysBetween = moment.duration(Math.abs(currentTime - targetTime)).asDays();
		return targetIsBeforeCurrent ? date.add(daysBetween, 'days') : date.subtract(daysBetween, 'days')
	});
}

changeToLastWeek = function() {
	alterCurrentDate(function(date){
		return date.subtract('days', 7);
	});
};

debugTime = function(time, name) {
	console.log(name + moment(time).format('MMMM Do YYYY, h:mm:ss a'));
}

Template['contentCalendar'].helpers({
	calendar_days : function() {
		// maps a status to the color that's going to be displayed
		calendarDays = Session.get('calendar_days');
		return calendarDays;
	},
	details_shown : function() {
		return Session.get('details_shown');	
	},
	is_not_client : function() {
		return Session.get('user_type') != 'client';
	},
	show_class : function() {
		var test = Session.get('details_shown') ? 'hidden' : '';
		return test;
	},
});

Template['contentCalendar'].events({
	'click .right.arrow' : function(event) {
		changeToNextWeek();
	},
	'click .left.arrow' : function(event) {
		changeToLastWeek();
	},
});

