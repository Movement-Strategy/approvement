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
		        	Deps.autorun(function(){
			        	calendarBuilder.initializeCalendarWeek(that.params.client, that.params.week);
			        	detailsHandler.hideDetails();
		        	});	        	
	        	} else {
		        	Router.go('/login');
	        	}
	        },
	    });
	});
}