if(Meteor.isClient) {
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
		
	Router.map(function () {
	    this.route('editItem', {
	        path :  'client/:client/week/:week/content/edit/:id',
	        controller :  HomeController,
	        onRun : function() {
				navHandler.onRouteLoad('edit_item', this.params);
	        },
	    });
	});
}
