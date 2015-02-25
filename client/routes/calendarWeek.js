if(Meteor.isClient) {
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
		
	Router.map(function () {
	    this.route('calendarWeek', {
	        path :  '/client/:client/week/:week',
	        controller :  HomeController,
	        onRun : function() {
	        	if(loginHandler.isLoggedIn()) {
		        	var that = this;
		        	calendarBuilder.initializeCalendarWeek(that.params.client, that.params.week);
		        	settingsWindowHandler.hide();
		        	mainContentHandler.showTemplate('contentCalendar');
	        	} else {
		        	Router.go('/login');
	        	}
	        },
	    });
	});
}
