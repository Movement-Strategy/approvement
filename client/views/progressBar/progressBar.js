handleSuccessGif = function() {
	Deps.autorun(function(){
		var totalPendingItems = Session.get('total_pending_items');
		var totalActions = Session.get('total_relevant_items');
		var allFinished = totalPendingItems == 0;
		
		if(totalPendingItems > 0) {
			Session.set('there_were_pending_items', true);
		}
		
		if(allFinished && Session.get('there_were_pending_items')) {
			Session.set('show_gif', true);
			Session.set('there_were_pending_items', false);
			Meteor.setTimeout(function(){
				Session.set('show_gif', false);
			}, 3000);
		}
	});
}

getBarWidth = function() {
	var requiredActions = Session.get('total_pending_items');
	var totalActions = Session.get('total_relevant_items');
	var completedActions = totalActions - requiredActions;
	var progressPercent = completedActions / totalActions;
	progressPercent = Math.round(progressPercent * 100);
	return progressPercent;
};


Template['progressBar'].helpers({
	bar_width : function() {
		return getBarWidth();
	},
	bar_class : function() {
		var barClass = '';
		var barWidth = getBarWidth();
		if(barWidth == 100) {
			barClass = 'successful';
		}
		if(barWidth > 50 && barWidth < 100) {
			barClass = 'blue';
		}
		if(barWidth <= 50 && barWidth > 25) {
			barClass = 'warning';
		}
		if(barWidth <= 25) {
			barClass = 'red';
		}
		return barClass;
	}
});

Template['progressBar'].events({
	'click .bar-container' : function() {
		pendingItemHandler.goToPendingItem(Session.get('pending_item_index'));
	}
});

