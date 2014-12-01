Template.draftBoard.created = function() {
    $(document).on('keydown', keyStrokeHandler.handleKeyStrokes);
};

Template.draftBoard.destroyed = function() {
    $(document).unbind('keydown');
};

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

