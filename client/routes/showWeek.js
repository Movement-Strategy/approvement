if(Meteor.isClient) {
	
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
	
	Router.map(function () {
	    this.route('showWeek', {
	        path :  '/client/:client/week/:week/shows',
	        controller :  HomeController,
	        onRun : function() {
	        	navHandler.onRouteLoad('show_overview', this.params);
	        },
	    });
	});
}
