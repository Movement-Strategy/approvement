if(Meteor.isClient) {
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
		
	Router.map(function () {
	    this.route('createItem', {
	        path :  'client/:client/week/:week/content/create',
	        controller :  HomeController,
	        onRun : function() {
				navHandler.onRouteLoad('create_item', this.params);
	        },
	    });
	});
}
