Template['dynamicNavButton'].helpers({
	hover_text : function() {
		navButtonHandler.initializePopup(this);
		return this.hover_text;
	}
});

Template['dynamicNavButton'].events({
	'click' : function() {
		navButtonHandler.onClick(this);	
	},
});

