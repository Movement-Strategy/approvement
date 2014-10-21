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
				var targetTime = moment(this.params.week, 'DD-MM-YYYY').format('X') * 1000;
				timeHandler.changeToTargetTime(targetTime);
				
	        },	
	    });
	});
}
