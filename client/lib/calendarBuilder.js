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
		return Session.equals('dragged_over_day', context.day.full_date) && this.dayIsRightScope(context);
	},
	resetDraggedOverDay : function() {
		Session.set('dragged_over_day', null);
	},
	onDragLeave : function() {
		event.preventDefault();
		this.resetDraggedOverDay();	
	},
	onDragEnter : function(event) {
		this.setDraggedOverDay(event)
	},
	onDrop : function(event) {
		// get the meteor context data associated with that element
		var approvalItemData = Session.get('dragged_item');
		var calendarDayData = UI.getElementData(event.target);
		var newScheduledTime = calendarDayData.day.scheduled_time;
		Meteor.call('updateStatus', approvalItemData._id, {scheduled_time : newScheduledTime});
		Session.set('dragged_item', null);
		event.preventDefault();
	},
	onDraggedOver : function(event) {
		event.originalEvent.dataTransfer.dropEffect = "move";
		event.preventDefault();
		if(Session.equals('dragged_over_day', null) && !Session.equals('dragged_item', null)){
			this.setDraggedOverDay(event);
		}
	},
	onDragOverArrowColumn : function(event, columnType)  {
		event.preventDefault();
		event.originalEvent.dataTransfer.dropEffect = "move";
		if(Session.get('allow_date_change')) {
			this.useColumnTypeToChangeDate(columnType);
			Session.set('allow_date_change', false);
			Meteor.setTimeout(function(){
				Session.set('allow_date_change', true);
			}, 500);
		}
	},
	useColumnTypeToChangeDate : function(columnType) {
		if(columnType == 'forward') {
			timeHandler.changeToNextWeek();
		} else {
			timeHandler.changeToLastWeek();
		}
	},
 	setDraggedOverDay : function(event) {
		var context = UI.getElementData(event.target);
		var draggedOverDay = context.day.full_date;
		if(this.dayIsRightScope(context)) {
			Session.set('dragged_over_day', draggedOverDay);
		}
		event.preventDefault();
	},
	dayIsRightScope : function(context) {
		var approvalItem = Session.get('dragged_item');
		return isRightScope = context.is_external ? approvalItem.scope == 'external' : approvalItem.scope == 'internal';
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