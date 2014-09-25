progressBarHandler = {
	setCountsForProgressBar : function() {
		pendingItemHandler.setPendingItemCount();
		pendingItemHandler.setRelevantItemCount();
	},
	getBarWidth : function() {
		var requiredActions = Session.get('total_pending_items');
		var totalActions = Session.get('total_relevant_items');
		var completedActions = totalActions - requiredActions;
		var progressPercent = completedActions / totalActions;
		progressPercent = Math.round(progressPercent * 100);
		return progressPercent;
	},
	getBarClass : function() {
		var barClass = '';
		var barWidth = this.getBarWidth();
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
};