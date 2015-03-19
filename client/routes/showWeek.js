if(Meteor.isClient) {
	
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
	
	Router.map(function () {
	    this.route('showWeek', {
	        path :  '/client/:client/week/:week/shows',
	        controller :  HomeController,
	        onRun : function() {
	        	if(loginHandler.isLoggedIn()) {
		        	Session.set('draft_variables_to_update', {});
		        	Session.set('error_on_convert', false);
				    calendarBuilder.initializeCalendarWeek(this.params.client, this.params.week);
				    dataTableHandler.show('show_overview');
	        	} else {
		        	Router.go('/login');
	        	}
	        },
	    });
	});
}
