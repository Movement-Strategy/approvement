if(Meteor.isClient) {
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
		
	Router.map(function () {
	    this.route('editItem', {
	        path :  'client/:client/week/:week/content/edit/:id',
	        controller :  HomeController,
	        onRun : function() {
	        	var detailsLoaded = false;
	        	if(loginHandler.isLoggedIn()) {
		        	var that = this;
		        	Deps.autorun(function(){
			        	calendarBuilder.initializeCalendarWeek(that.params.client, that.params.week);
			        	if(Session.get('page_is_ready') && Session.get('approval_items_are_ready') && !detailsLoaded) {
							var creatingNew = false;
							var context = Session.get('approval_item_context') ? Session.get('approval_item_context') : {_id : that.params.id};
							var params = {
								is_creating_new : creatingNew,
								context : context,
							};
							settingsWindowHandler.show('approval_item_details', params);
							detailsLoaded = true;
			        	}
		        	});        	
	        	} else {
		        	Router.go('/login');
	        	}
	        },
	    });
	});
}
