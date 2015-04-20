if(Meteor.isClient) {
	
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
	
	Router.map(function () {
	    this.route('channelWeek', {
	        path :  '/client/:client/week/:week/channels',
	        controller :  HomeController,
	        onRun : function() {
	        	navHandler.onRouteLoad('channel_overview', this.params);
	        },
	    });
	});
}
