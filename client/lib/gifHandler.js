gifHandler = {
	handleSuccessGif : function() {
		Deps.autorun(function(){
			if(gifHandler.allTasksAreFinished() && Session.get('there_were_pending_items')) {
				gifHandler.showGif();
			}
		});
	},
	showGif : function() {
		Session.set('show_gif', true);
		Session.set('there_were_pending_items', false);
		this.hideGifOnDelay();
	},
	hideGifOnDelay : function() {
		Meteor.setTimeout(function(){
			Session.set('show_gif', false);
		}, 3000);
	},
	allTasksAreFinished : function() {
		var totalPendingItems = Session.get('total_pending_items');
		var totalActions = Session.get('total_relevant_items');
		var allFinished = totalPendingItems == 0;
		
		if(totalPendingItems > 0) {
			Session.set('there_were_pending_items', true);
		}
		return allFinished;
	},	
};