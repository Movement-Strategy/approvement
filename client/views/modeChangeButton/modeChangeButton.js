Template['modeChangeButton'].helpers({
	button_text : function() {
		return Session.get('draft_board_is_shown') ? 'Calendar Mode' : 'Draft Mode';
	},
});

Template['modeChangeButton'].events({
	'click .mode-button' : function() {
		calendarBuilder.onModeChangeClick();
	},
});

