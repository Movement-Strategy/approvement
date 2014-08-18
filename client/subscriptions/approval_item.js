Meteor.subscribe('approval_items_for_this_user', onReady = function(){
	Deps.autorun(function () {
		setApprovalItemsByDay();
		setCalendarDays();
	});	
});

