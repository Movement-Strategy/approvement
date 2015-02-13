Template['modeChangeButton'].helpers({
	button_text : function() {
		return draftBoardHandler.isShown() ? 'Calendar Mode' : 'Draft Mode';
	},
});

Template['modeChangeButton'].events({
	'click .mode-button' : function() {
		calendarBuilder.onModeChangeClick();
	},
});

