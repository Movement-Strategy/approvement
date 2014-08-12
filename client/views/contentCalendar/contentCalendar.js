Template['contentCalendar'].helpers({
	calendar_days : function() {
		return [
			{
				day_name : 'Monday',
				approval_items : {
					external : [
						{
							label_color : 'green',
							label_icon : 'instagram',
						},
					],
					internal : [
						{
							label_color : 'orange',
							label_icon : 'twitter',
						},
					],
				},
			},
			{
				day_name : 'Tuesday',
			},
			{
				day_name : 'Wednesday',
			},
			{
				day_name : 'Thursday',
			},
			{
				day_name : 'Friday',
			},
			{
				day_name : 'Saturday',
			},
			{
				day_name : 'Sunday',
			},
		];
	} 
});

Template['contentCalendar'].events({
});

