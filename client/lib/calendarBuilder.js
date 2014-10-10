calendarBuilder = {
	handleCalendarDays : function() {
		Deps.autorun(function(){
			calendarBuilder.setCurrentCalendarDays();
		});
	},
	setCurrentCalendarDays : function() {
		var timestamp = Session.get('timestamp_for_current_date');
		var dateObject = moment(timestamp);
		var approvalItemsByDay = Session.get('cached_day_index') != null ? this.getCachedApprovalItems():  approvalItemBuilder.getApprovalItemsByDay();
		var calendarDays = _.map(this.getDefaultCurrentDays(), function(day, dayIndex){
			day = calendarBuilder.addContextToCalendarDay(day, dayIndex, dateObject);
			var newDayIndex = parseInt(dayIndex);
			day = approvalItemBuilder.addItemsToCalendarDay(day, newDayIndex, approvalItemsByDay);
			return day;
		});
		Session.set('calendar_days', calendarDays);
		Session.set('approval_items_are_ready', true);
	},
	getCachedApprovalItems : function() {
		var cachedApprovalItems = Session.get('cached_approval_items');
		var approvalItems = approvalItemBuilder.getApprovalItemsByDay();
		var cachedIndex = Session.get('cached_day_index');
		approvalItems[cachedIndex] = cachedApprovalItems[cachedIndex];
		return approvalItems;
	},
	addContextToCalendarDay : function(day, dayIndex, dateObject) {
		var newDay = day;
		var isoDate = dateObject;
		
		// convert the day index into the correct date
		isoDate.isoWeekday(dayIndex);
		newDay['index'] = dayIndex;
		newDay['day_name'] = newDay.name;
		newDay['full_date'] = isoDate.format("MM/DD/YYYY");
		newDay['is_today'] = newDay['full_date'] == moment().format("MM/DD/YYYY");
		newDay['scheduled_time'] = isoDate.format("X") * 1000;
		return newDay;
	},
	getDefaultCurrentDays : function() {
		var defaultDays = {
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
		return defaultDays;
	},
	dayIsDraggedOver : function(context) {
		return Session.equals('dragged_over_day', context.day.full_date) && this.dayIsRightScope(context);
	},
	dayIsRightScope : function(context) {
		var approvalItem = Session.get('dragged_item');
		if(approvalItem != null) {
			return context.is_external ? approvalItem.scope == 'external' : approvalItem.scope == 'internal';
		} else {
			return false;
		}
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
		Meteor.defer(function(){
			Session.set('dragged_item', null);
			Session.set('cached_day_index', null);
		});
	},
	onDraggedOver : function(event) {
		event.originalEvent.dataTransfer.dropEffect = "move";
		event.preventDefault();
		if(Session.equals('dragged_over_day', null) && !Session.equals('dragged_item', null)){
			this.setDraggedOverDay(event);
		}
	},
	onDragOverArrowColumn : function(event, columnType)  {
		if(Session.get('allow_date_change')) {
			Session.set('cached_day_index', Session.get('dragged_item')['day']['index']);
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