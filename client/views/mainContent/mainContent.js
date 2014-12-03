Template['mainContent'].helpers({
	show_gif : function() {
		return gifHandler.gifShouldBeShown();
	},
	show_draft_board : function() {
		return draftBoardHandler.isShown();
	},
});

Template['mainContent'].events({
});

