calendarBuilder = {
	intervalHandler : null,
	handleCalendarDays : function() {
		Deps.autorun(function(){
			selectedClientID = Session.get('selected_client_id');
			currentTimestamp = Session.get('time_stamp_for_current_date');
			
			if(selectedClientID != null && currentTimestamp != null) {
				calendarBuilder.setCurrentCalendarDays();
			}
		});
	},
	goToNewWeek : function(clientID, weekID) {
		Router.go('/client/' + clientID + '/week/' + weekID);	
	},
	onModeChangeClick : function() {
		var clientID = Session.get('selected_client_id');
		var weekID = timeHandler.getWeekForSelectedTime();
		if(Session.get('draft_board_is_shown')) {
			calendarBuilder.goToNewWeek(clientID, weekID);
		} else {
			draftItemHandler.goToDraftWeek(clientID, weekID);
		}
	},
	setCurrentCalendarDays : function() {
		var timestamp = timeHandler.getTimestampForCurrentDate();
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
	initializeCalendarWeek : function(clientID, weekName) {
        if(clientID != Session.get('selected_client_id')) {
	        Session.set('approval_items_are_ready', false);
	        Session.set('selected_client_id', clientID);
        }
        
		var newTimestamp = timeHandler.dateStringToStartOfWeekTimestamp(weekName);
		var currentTimestamp = timeHandler.getTimestampForCurrentDate();
		if(currentTimestamp != newTimestamp) {
			Session.set('approval_items_are_ready', false);
			timeHandler.setCurrentTimestampToStartOfWeekForDateString(weekName);
		}
	},
	getCachedApprovalItems : function() {
		var cachedApprovalItems = Session.get('cached_approval_items');
		var approvalItems = approvalItemBuilder.getApprovalItemsByDay();
		var cachedIndex = Session.get('cached_day_index');
		approvalItems[cachedIndex] = cachedApprovalItems[cachedIndex];
		return approvalItems;
	},
	plusIsDraggedOver : function() {
		return Session.get('plus_is_dragged_over');	
	},
	onDragOverPlusButton : function() {
		Session.set('plus_is_dragged_over', true);
	},
	onDropOverPlusButton : function() {
		var creatingNew = true;
		var context = Session.get('dragged_over_day');
		var clientID = Session.get('selected_client_id');
		var weekID = timeHandler.getWeekForSelectedTime();
		Session.set('item_to_copy', Session.get('dragged_item'));
		Session.set('approval_item_context', context);
		Meteor.defer(function(){
			Session.set('plus_is_dragged_over', false);
		});
		Router.go('/client/' + clientID + '/week/' + weekID + '/content/create');
	},
	onDragExitPlusButton : function() {
		Session.set('plus_is_dragged_over', false);
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
	stopChangingDates : function() {
		if(calendarBuilder.intervalHandler != null) {
			Meteor.clearInterval(calendarBuilder.intervalHandler);
			calendarBuilder.intervalHandler = null;
		}
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
		var draggedOverDay = Session.get('dragged_over_day');
		var draggedOverDate = draggedOverDay != null ? Session.get('dragged_over_day').day.full_date : null;
		return draggedOverDate == context.day.full_date && this.dayIsRightScope(context);
	},
	dayIsRightScope : function(context) {
		var approvalItem = Session.get('dragged_item');
		if(approvalItem != null) {
			return context.day_type == approvalItem.scope;
		} else {
			return false;
		}
	},
	itemIsDraggedOutsideOfCalendar : function(context) {
		var draggedItem = Session.get('dragged_item');
		var draggedID = null;
		if(draggedItem) {
			var draggedID = _.has(draggedItem, '_id') ? draggedItem._id : null;
		}
		var isCurrentItem = draggedID == context._id;
		return Session.get('is_dragged_outside_of_calendar') && isCurrentItem;
	},
	resetDraggedOverDay : function() {
		Session.set('dragged_over_day', null);
	},
	onDragLeave : function() {
		event.preventDefault();
		this.resetDraggedOverDay();	
	},
	onDragExit : function() {
		Session.set('is_dragged_outside_of_calendar', true);
	},
	onDragEnter : function(event) {
		Meteor.defer(function(){
			Session.set('is_dragged_outside_of_calendar', false);
		});
		this.setDraggedOverDay(event)
	},
	onDrop : function(event) {
		// get the meteor context data associated with that element
		var approvalItemData = Session.get('dragged_item');
		var calendarDayData = UI.getData(event.target);
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
		Meteor.defer(function(){
			Session.set('is_dragged_outside_of_calendar', false);
		});
		Session.set('cached_day_index', Session.get('dragged_item')['day']['index']);
		this.useColumnTypeToChangeDate(columnType);
	},
	useColumnTypeToChangeDate : function(columnType) {
		if(columnType == 'forward') {
			timeHandler.changeToNextWeek();
		} else {
			timeHandler.changeToLastWeek();
		}
	},
 	setDraggedOverDay : function(event) {
		var context = UI.getData(event.target);
		if(this.dayIsRightScope(context)) {
			Session.set('dragged_over_day', context);
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