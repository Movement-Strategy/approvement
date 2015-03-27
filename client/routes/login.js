if(Meteor.isClient) {
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
		
	Router.map(function () {
	    this.route('login', {
	        path :  'login',
	        controller :  HomeController,
	        onRun : function() {
				if(!Session.get('logging_in')) {
					warningMessageHandler.resetMessage();
					Meteor.logout(function(){
						navHandler.resetRoute();
						Session.set('approval_items_are_ready', false);
						Session.set('clients_are_ready', false);
						Session.set('page_is_ready', false);
						Session.set('overview_page_is_ready', false);
						Session.set('there_were_pending_items', false);
					});
					loginHandler.changeToKeyMode();
				}

	        },
	    });
	});
}
