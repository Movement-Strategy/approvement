Template['modeChangeButton'].helpers({
	button_text : function() {
		return draftBoardHandler.isShown() ? 'Calendar Mode' : 'Draft Mode';
	},
	is_manager : function() {
		return userHandler.userIsType('social_media_manager');	
	},
});

Template['modeChangeButton'].events({
	'click .mode-button' : function() {
		calendarBuilder.onModeChangeClick();
	},
});

