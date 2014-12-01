Template['draftBoard'].helpers({
});

Template['draftBoard'].events({
	'click .icon.last-week' : function() {
		timeHandler.changeToLastWeek();
	},
	'click .icon.next-week' : function() {
		timeHandler.changeToNextWeek();
	},
});

