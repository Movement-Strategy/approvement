Deps.autorun(function(){
	Meteor.subscribe('comments_for_client', Session.get('selected_client_id'), onReady = function(){
		
	});
});

