Meteor.startup(function () {
	
	var currentDays = {
		1 : {
			name : 'Monday',
			full_date : 'august 12, 2014',
		},
		2 : {
			name : 'Tuesday',
			full_date : 'august 13, 2014',
		},
		3 : {
			name : 'Wednesday',
			full_date : 'august 14, 2014',
		},
		4 : {
			name : 'Thursday',
			full_date : 'august 15, 2014',
		},
		5 : {
			name : 'Friday',
			full_date : 'august 16, 2014',
		},
		6 : {
			name : 'Saturday',
			full_date : 'august 17, 2014',
		},
		7 : {
			name : 'Sunday',
			full_date : 'august 18, 2014',
		},
	};
	
	var approvalItemsByDay = {
		1 : [
			{
				type : 'facebook',
				status : 'approved',
				scope : 'internal',
			},
			{
				type : 'instagram',
				status : 'rejected',
				scope : 'external',
			},
			{
				type : 'twitter',
				status : 'submitted',
				scope : 'internal',
			},
			{
				type : 'twitter',
				status : 'commented',
				scope : 'external',
			},
		],
	};
	
	Session.set('current_days', currentDays);
	Session.set('approval_items_by_day', approvalItemsByDay);
	setCalendarDays();
	
});