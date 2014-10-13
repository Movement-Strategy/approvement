Deps.autorun(function(){
	Session.set('comments_are_ready', false);
	Meteor.subscribe('comments_for_client', Session.get('selected_client_id'), onReady = function(){
		Session.set('comments_are_ready', true);
	});
});

