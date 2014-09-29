notificationModalHandler = {
	initializeModal : function() {
		Meteor.defer(function(){
			$('.notification-modal').modal('show');
		});
	}
};