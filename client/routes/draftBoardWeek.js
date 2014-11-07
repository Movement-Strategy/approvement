if(Meteor.isClient) {
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
		
	Router.map(function () {
	    this.route('calendarWeek', {
	        path :  '/client/:client/week/:week/draft',
	        controller :  HomeController,
	        loadingTemplate : 'loader',
	        waitOn : function() {
		      	 return [
		      	 	Meteor.subscribe('draft_item', onReady = function(){
			      		console.log('draft_item_ready');
				  	}),
					Meteor.subscribe('content_bucket', onReady = function(){
						console.log('content_bucket_ready');
					/* 	contentBucketHandler.initializeContentBuckets(); */
					})
		      	 ]; 
	        },
	        action : function() {
	        	if(loginHandler.isLoggedIn()) {
		        	var that = this;
		        	Deps.autorun(function(){
			        	calendarBuilder.initializeCalendarWeek(that.params.client, that.params.week);
			        	Session.set('draft_board_is_shown', true);
		        	});	        	
	        	} else {
		        	Router.go('/login');
	        	}
		    	this.render('defaultBody');    
	        },
	    });
	});
}
