if(Meteor.isClient) {
	
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
	
	Router.map(function () {
	    this.route('overviewWeek', {
	        path :  '/week/:week/overview',
	        controller :  HomeController,
	        onRun : function() {
	        	
	        	if(loginHandler.isLoggedIn()) {
		        	Session.set('page_is_ready', true);
		        	Session.set('draft_variables_to_update', {});
		        	Session.set('error_on_convert', false);
				    calendarBuilder.initializeCalendarWeek(null, this.params.week);
				    dataTableHandler.show('client_overview');
	        	} else {
		        	Router.go('/login');
	        	}
	        },
	    });
	});
}
