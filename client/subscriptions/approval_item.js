Deps.autorun(function(){
	if(loginHandler.isLoggedIn()) {
		Session.set('approval_items_ready', false);
		Session.set('raw_approval_items_ready', false);
		Meteor.subscribe('approval_items_for_this_user', Meteor.userId(), Session.get('user_type'), onReady = function(){
			Session.set('raw_approval_items_ready', true);
			approvalItemBuilder.onApprovalItemsReady();
		});
	}
});

