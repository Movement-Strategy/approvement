if(Meteor.isClient) {
	
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
	
	Router.map(function () {
	    this.route('overviewWeek', {
	        path :  '/client/:client/week/:week/overview',
	        controller :  HomeController,
	        onRun : function() {
	        	if(loginHandler.isLoggedIn()) {
		        	Session.set('draft_variables_to_update', {});
		        	Session.set('error_on_convert', false);
				    calendarBuilder.initializeCalendarWeek(this.params.client, this.params.week);
				    mainContentHandler.showTemplate('bucketOverview');
	        	} else {
		        	Router.go('/login');
	        	}
	        },
	    });
	});
}
