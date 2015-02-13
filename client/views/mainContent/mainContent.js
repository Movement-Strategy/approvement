Template['mainContent'].helpers({
	show_gif : function() {
		return gifHandler.gifShouldBeShown();
	},
	show_draft_board : function() {
		return draftBoardHandler.isShown();
	},
	current_template : function() {
		return mainContentHandler.getCurrentTemplate();
	},
});

Template['mainContent'].events({
});

