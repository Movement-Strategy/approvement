changeToNextWeek = function() {
	momentDate.add('days', 7);
	setCurrentDays(momentDate);
	setCalendarDays();
	setApprovalItemsByDay();
	
}

changeToLastWeek = function() {
	momentDate.subtract('days', 7);
	setCurrentDays(momentDate);
	setCalendarDays();
	setApprovalItemsByDay();
}

setCurrentDays = function(currentDate) {
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
		day['full_date'] = currentDate.isoWeekday(dayIndex).format("MMMM D, YYYY");
		day['scheduled_time'] = currentDate.isoWeekday(dayIndex).format("X") * 1000;
		
		return day;
	});
	Session.set('current_days', currentDays);
	
}

setApprovalItemsByDay = function() {
	var approvalItems = ApprovalItem.find({client_id : Session.get('selected_client_id')}).fetch();
	approvalItemsByDay = {};
	_.map(approvalItems, function(item){
		momentDate = moment(item.scheduled_time);
		var dayIndex = momentDate.isoWeekday();
		if(!_.has(approvalItemsByDay, dayIndex)) {
			approvalItemsByDay[dayIndex] = [];
		}
		approvalItemsByDay[dayIndex].push(item);
	});
	Session.set('approval_items_by_day', approvalItemsByDay);
	
}

Template['contentCalendar'].helpers({
	calendar_days : function() {
		// maps a status to the color that's going to be displayed
		
		calendarDays = Session.get('calendar_days');
		return calendarDays;
	},
	is_not_client : function() {
		return Session.get('user_type') != 'client';
	},
	initializeModal : function() {
		Meteor.defer(function(){
			$('.create-item').modal({detachable : false});
		}); 
	},
});

Template['contentCalendar'].events({
	'click .right.arrow' : function() {
		changeToNextWeek();
	},
	'click .left.arrow' : function() {
		changeToLastWeek();
	},
});

