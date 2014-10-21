if(Meteor.isClient) {
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
		
	Router.map(function () {
	    this.route('calendarWeek', {
	        path :  '/client/:client/week/:week',
	        controller :  HomeController,
	        onRun : function() {
		        Session.set('selected_client_id', this.params.client);
				timeHandler.setCurrentTimeStampFromDateString(this.params.week);
	        },
	    });
	});
}
