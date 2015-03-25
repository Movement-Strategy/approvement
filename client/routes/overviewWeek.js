if(Meteor.isClient) {
	
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
	
	Router.map(function () {
	    this.route('overviewWeek', {
	        path :  '/week/:week/overview',
	        controller :  HomeController,
	        onRun : function() {
	        	navHandler.onRouteLoad('client_overview', this.params);
	        },
	    });
	});
}
