Meteor.subscribe('approval_items_for_this_user', onReady = function(){
	Deps.autorun(function () {
		if(Session.get('clients_are_ready')) {
			setApprovalItemsByDay();
			setCalendarDays();
		}
	});	
});

