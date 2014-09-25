Template['progressBar'].helpers({
	bar_width : function() {
		return progressBarHandler.getBarWidth();
	},
	bar_class : function() {
		return progressBarHandler.getBarClass();
	}
});

Template['progressBar'].events({
	'click .bar-container' : function() {
		pendingItemHandler.goToPendingItem(Session.get('pending_item_index'));
	}
});

