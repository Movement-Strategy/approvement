if(Meteor.isClient) {
	
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
	
	Router.map(function () {
	    this.route('calendarWeek', {
	        path :  '/client/:client/week/:week/draft',
	        controller :  HomeController,
	        onRun : function() {
	        	if(loginHandler.isLoggedIn()) {
		        	var that = this;
		        	Deps.autorun(function(){
			        	calendarBuilder.initializeCalendarWeek(that.params.client, that.params.week);
			        	Session.set('draft_board_is_shown', true);
			        	contentBucketHandler.handleContentBuckets();
			        	draftItemHandler.handleDraftItems();
		        	});	
	        	} else {
		        	Router.go('/login');
	        	}
	        },
	    });
	});
}
