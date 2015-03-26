if(Meteor.isClient) {
	
	Router.onBeforeAction(function (pause) {
	  if (!this.ready()) {
	    this.render('loader');
	    pause(); // otherwise the action will just render the main template.
	  }
	});
	
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
		
	Router.map(function () {
	    this.route('home', {
	        path :  '/',
	        controller :  HomeController,
	        onRun : function() {
	        	navHandler.onRouteLoad('home');
	        }
	    });
	});
}
