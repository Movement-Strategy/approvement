pageLoadHandler = {
	checkIfPageIsReady : function() {
		Deps.autorun(function(){
			
			// as the page is loading, make sure all of the content thats required from collections is ready before loading
			if(Session.get('approval_items_are_ready') && Session.get('clients_are_ready')) {
				Session.set('page_is_ready', true);
			}
		});
	},
	pageIsReady : function() {
		return Session.get('page_is_ready');
	}
};