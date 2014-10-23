if(Meteor.isClient) {
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
		
	Router.map(function () {
	    this.route('editItem', {
	        path :  'login',
	        controller :  HomeController,
	        onRun : function() {
				Meteor.logout();
				Session.set('clients_are_ready', false);
	        },
	    });
	});
}
