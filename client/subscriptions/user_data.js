
Meteor.subscribe('userData', onReady = function(){
	Deps.autorun(function(){
		userHandler.onUserDataReady();
	});
});
