
statusColorMap = {
	approved : 'green',
	rejected : 'red',
	submitted : 'grey',
	commented : 'orange',
};

var setApprovalItemInDay = function(day, approvalItem) {
	var scope = approvalItem.scope;
	if(!_.has(day['approval_items'],scope)) {
		day['approval_items'][scope] = [];
	}
	var processedItem = {};
	
	// convert the status to a label color
	processedItem['label_color'] = statusColorMap[approvalItem.status];
	processedItem['label_icon'] = approvalItem.type;
	processedItem['contents'] = approvalItem.contents;
	
	// add this back in so we can process this data structure the same depending on if its being editted or created new
	processedItem['day'] = {
		scheduled_time : day.scheduled_time
	};
	day['approval_items'][scope].push(processedItem);
	
	return day;
}

setAllApprovalItemsInDay = function(day, dayIndex, approvalItemsByDay) {
	if(_.has(approvalItemsByDay, dayIndex)) {
		day['approval_items'] = {};	
		_.map(approvalItemsByDay[dayIndex], function(approvalItem) {

			day = setApprovalItemInDay(day, approvalItem);
		});
		
	}
	return day;
}

setCalendarDays = function() {
	var approvalItemsByDay = Session.get('approval_items_by_day');
	var calendarDays = _.map(Session.get('current_days'), function(day, dayIndex){
		day['day_name'] = day.name;
		return setAllApprovalItemsInDay(day, dayIndex + 1, approvalItemsByDay);
	});
	Session.set('calendar_days', calendarDays);
	
	Session.set('approval_items_are_ready', true);
}


Template['calendarDay'].helpers({
});

Template['calendarDay'].events({
	'click .create-item-button' : function(event) {
		prepareModalToShow(this, true);
	},
});

