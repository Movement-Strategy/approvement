calendarBuilder = {
	buildAndSetCalendarDays : function() {
		var approvalItemsByDay = Session.get('approval_items_by_day');
		var calendarDays = _.map(Session.get('current_days'), function(day, dayIndex){
			day['day_name'] = day.name;
			return approvalItemBuilder.addItemsToCalendarDay(day, dayIndex + 1, approvalItemsByDay);
		});
		Session.set('calendar_days', calendarDays);
		Session.set('approval_items_are_ready', true);
	},
	setCurrentDays : function(currentDate) {
		var currentDays = {
			1 : {
				name : 'Monday',
			},
			2 : {
				name : 'Tuesday',
			},
			3 : {
				name : 'Wednesday',
			},
			4 : {
				name : 'Thursday',
			},
			5 : {
				name : 'Friday',
			},
			6 : {
				name : 'Saturday',
			},
			7 : {
				name : 'Sunday',
			},
		};
		
		currentDays = _.map(currentDays, function(day, dayIndex){
			var isoDate = currentDate;
			
			// conver the day index into the correct date
			isoDate.isoWeekday(dayIndex);
			day['full_date'] = isoDate.format("MM/DD/YYYY");
			day['scheduled_time'] = isoDate.format("X") * 1000;
			return day;
		});
		Session.set('current_days', currentDays);
	}
	
};