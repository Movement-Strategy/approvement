Meteor.startup(function () {
	pageLoadHandler.setSessionDefaults();
	pageLoadHandler.checkIfPageIsReady();
	pageLoadHandler.onStartUp();
});