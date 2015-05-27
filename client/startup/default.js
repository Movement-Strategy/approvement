Meteor.startup(function () {
	BrowserPolicy.content.allowOriginForAll('s3-us-west-2.amazonaws.com');
	pageLoadHandler.setSessionDefaults();
	pageLoadHandler.checkIfPageIsReady();
	pageLoadHandler.onStartUp();
});