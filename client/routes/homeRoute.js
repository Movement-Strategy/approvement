if(Meteor.isClient) {
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
		
	Router.map(function () {
	    this.route('home', {
	        path :  '/',
	        controller :  HomeController,
	        onRun : function() {
		        Deps.autorun(function(){
					if(Session.get('page_is_ready')) {
						var clients = Session.get('current_clients');
						Router.go('/client/' + clients[0] + '/week/' + timeHandler.getCurrentWeek());
					}
		        });
	        }
	    });
	});
}
