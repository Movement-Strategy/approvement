if(Meteor.isClient) {
	
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
	
	Router.map(function () {
	    this.route('calendarWeek', {
	        path :  '/client/:client/week/:week/draft',
	        controller :  HomeController,
	        onRun : function() {
	        	navHandler.onRouteLoad('draft_board', this.params);
	        },
	    });
	});
}
