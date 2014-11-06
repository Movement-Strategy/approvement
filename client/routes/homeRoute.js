if(Meteor.isClient) {
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
		
	Router.map(function () {
	    this.route('home', {
	        path :  '/',
	        controller :  HomeController,
	        onRun : function() {
		       	if(loginHandler.isLoggedIn()) {
			        Deps.autorun(function(){
						if(Session.get('clients_are_ready')) {
							var clients = Session.get('current_clients');
							
							// go the first client in the client list
							var clientID = clients[0];
							
							// get the start of the current week
							var weekID = timeHandler.getDateStringForStartOfThisWeek();
							// navigate to that week
							calendarBuilder.goToNewWeek(clientID, weekID);
							
						}
			        });
		       	} else {
			       	Router.go('/login');
		       	}
	        }
	    });
	});
}
