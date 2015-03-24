if(Meteor.isClient) {
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
		
	Router.map(function () {
	    this.route('calendarWeek', {
	        path :  '/client/:client/week/:week',
	        controller :  HomeController,
	        onRun : function() {
				navHandler.onRouteLoad('content_calendar', this.params);
	        },
	    });
	});
}
