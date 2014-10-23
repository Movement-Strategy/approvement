if(Meteor.isClient) {
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
		
	Router.map(function () {
	    this.route('editItem', {
	        path :  'client/:client/week/:week/content/edit/:id',
	        controller :  HomeController,
	        onRun : function() {
	        	if(loginHandler.isLoggedIn()) {
		        	var that = this;
		        	Deps.autorun(function(){
			        	calendarBuilder.initializeCalendarWeek(that.params.client, that.params.week);
			        	if(Session.get('page_is_ready')) {
							var creatingNew = false;
							var context = Session.get('approval_item_context') ? Session.get('approval_item_context') : {_id : that.params.id};
							detailsHandler.showDetails(context, creatingNew);
			        	}
		        	});	        	
	        	} else {
		        	Router.go('/login');
	        	}
	        },
	    });
	});
}
