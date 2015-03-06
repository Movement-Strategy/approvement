
Template['draftBoard'].helpers({
	week : function() {
		return timeHandler.getWeekForSelectedTime();	
	},
});

Template['draftBoard'].events({
	'click .icon.last-week' : function() {
		timeHandler.changeToLastWeek();
	},
	'click .icon.next-week' : function() {
		timeHandler.changeToNextWeek();
	},
});

keyStrokeHandler.types('window', {
	draft_board : {
		on_left_down : function(event, context) {
			calendarBuilder.onLeftPress();
		},
		on_right_down : function(event, context) {
			calendarBuilder.onRightPress();
		}
	},
});

