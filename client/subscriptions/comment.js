Deps.autorun(function(){
	Session.set('comments_are_ready', false);
	if(clientHandler.clientIsSelected()) {
		Meteor.subscribe('comments_for_client', clientHandler.getSelectedClientID(), onReady = function(){
			Session.set('comments_are_ready', true);
		});
	}
});

