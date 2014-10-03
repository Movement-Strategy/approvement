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
	gifShouldBeShown : function() {
		if(!userHandler.userIsType('client')) {
			return Session.get('show_gif');
		} else {
			return false;
		}
	},
	getGifURL : function(){
		return this.gifs[Math.floor(Math.random() * this.gifs.length)];
	},
	gifs : [
		'http://media.giphy.com/media/tyxovVLbfZdok/giphy.gif',
		'http://media1.giphy.com/media/JQNM4AgN7lFUA/giphy.gif',
		'http://media.giphy.com/media/5xtDarvV3mbQpRABhNC/giphy.gif',
		'http://media.giphy.com/media/112VS6QqBw52Ks/giphy.gif',
		'http://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif',
		'http://media.giphy.com/media/iFmxR5QdkEQKI/giphy.gif',
		'http://media.giphy.com/media/kKo2x2QSWMNfW/giphy.gif',
		'http://media.giphy.com/media/13wAmg8pGU2olq/giphy.gif',
		'http://media.giphy.com/media/gbbZL8JOuHWDu/giphy.gif',
		'http://media.giphy.com/media/RpVZL0sy3vrri/giphy.gif',
		'http://media.giphy.com/media/5xrkJe3IJKSze/giphy.gif',
		'http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif',
		'http://media.giphy.com/media/NsFDCblOHz9QI/giphy.gif',
	]	
};