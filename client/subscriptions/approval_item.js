Deps.autorun(function(){
	if(loginHandler.isLoggedIn()) {
		Session.set('approval_items_ready', false);
		Meteor.subscribe('approval_items_for_this_user', Meteor.userId(), onReady = function(){
			approvalItemBuilder.onApprovalItemsReady();
		});
	}
});

