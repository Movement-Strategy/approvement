getStartOfWeek = function() {
	var currentDays = Session.get('current_days');
	var startOfWeekTime = currentDays[1]['scheduled_time'];
	return moment(startOfWeekTime);
}

alterCurrentDate = function(alterFunction) {
	var startOfWeek = getStartOfWeek();
	startOfWeek = alterFunction(startOfWeek);
	momentDate = startOfWeek;
	setCurrentDays(momentDate);
	setCalendarDays();
	setApprovalItemsByDay();
}

changeToNextWeek = function() {
	alterCurrentDate(function(date){
		return date.add('days', 7);
	});
};

changeToLastWeek = function() {
	alterCurrentDate(function(date){
		return date.subtract('days', 7);
	});
};

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
		var isoDate = currentDate;
		isoDate.isoWeekday(dayIndex);
		day['full_date'] = isoDate.format("MMMM D, YYYY");
		day['scheduled_time'] = isoDate.format("X") * 1000;
		return day;
	});
	Session.set('current_days', currentDays);
	
}

debugTime = function(time, name) {
	console.log(name + moment(time).format('MMMM Do YYYY, h:mm:ss a'));
}

var getApprovalItemQuery = function() {
	
	var startOfWeek = getStartOfWeek();
	var startTime = startOfWeek.format('X') * 1000;
	
	var endDate = startOfWeek;
	endDate.add(7, 'days');
	var endTime = endDate.format('X') * 1000;
	return {
		scheduled_time : {
			$gte : startTime,
			$lt : endTime,
		},
		client_id : Session.get('selected_client_id'),
	};
};

setApprovalItemsByDay = function() {
	var approvalItemQuery = getApprovalItemQuery();
	var approvalItems = ApprovalItem.find(approvalItemQuery).fetch();
	approvalItemsByDay = {};
	
	_.map(approvalItems, function(item){
		var scheduledDate = moment(item.scheduled_time);
		var dayIndex = scheduledDate.isoWeekday();
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
		if(Session.get('current_content_type') != {}) {
			Meteor.defer(function(){
				$('.create-item').modal({detachable : false});
				$('.create-item').modal('refresh');
			});
		}
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

