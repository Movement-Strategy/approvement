Template['dynamicNavButtons'].helpers({
	buttons : function() {
		return mainContentHandler.getDynamicButtons();	
	},
});

Template['dynamicNavButtons'].events({
	'click .dynamic-mode-button' : function() {
		mainContentHandler.onClickDynamicButton(this);
	},
});

