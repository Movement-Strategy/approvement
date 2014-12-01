if(Meteor.isClient) {
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
		
	Router.map(function () {
	    this.route('calendarWeek', {
	        path :  '/client/:client/week/:week',
	        controller :  HomeController,
	        onRun : function() {
	        	Session.set('draft_board_is_shown', false);
	        	if(loginHandler.isLoggedIn()) {
		        	var that = this;
		        	calendarBuilder.initializeCalendarWeek(that.params.client, that.params.week);
		        	detailsHandler.hideDetails();
	        	} else {
		        	Router.go('/login');
	        	}
	        },
	    });
	});
}
