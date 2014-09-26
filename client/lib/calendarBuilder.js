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
	defaultCurrentDays : {
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
	},
	setCurrentDays : function(currentDate) {
		
		// Iterate over the default days and set the full date based on what the current date is
		currentDays = _.map(this.defaultCurrentDays, function(day, dayIndex){
			var isoDate = currentDate;
			
			// convert the day index into the correct date
			isoDate.isoWeekday(dayIndex);
			day['full_date'] = isoDate.format("MM/DD/YYYY");
			day['is_today'] = day['full_date'] == moment().format("MM/DD/YYYY");
			day['scheduled_time'] = isoDate.format("X") * 1000;
			return day;
		});
		Session.set('current_days', currentDays);
	},
	dayIsDraggedOver : function(context) {
		return Session.equals('dragged_over_day', context.day.full_date);
	},
	onDragEnter : function(event) {
		var context = UI.getElementData(event.target);
		var draggedOverDay = context.day.full_date;
		Session.set('dragged_over_day', draggedOverDay);
		event.preventDefault();
	},
	getCalendarDays : function() {
		return Session.get('calendar_days');
	},
	getDayFromContext : function(context) {
		if(Session.get('reset_items')) {
			return {};
		} else {
			return context.day;
		}
	}
};