if(Meteor.isClient) {
	var HomeController = RouteController.extend({
	    template: 'defaultBody'
	});
		
	Router.map(function () {
	    this.route('editItem', {
	        path :  '/content/edit/:id',
	        controller :  HomeController,
	        onRun : function() {
	        	var creatingNew = false;
	        	var context = Session.get('approval_item_context') ? Session.get('approval_item_context') : {_id : this.params.id};
	        	detailsHandler.showDetails(context, creatingNew);
	        },
	    });
	});
}
