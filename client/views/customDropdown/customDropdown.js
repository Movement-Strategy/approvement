Template['customDropdown'].helpers({
	initialize : function() {
		customClientHandler.initializeDropdown();
	},
	options : function() {
		return customClientHandler.getCustomDropdownOptions();
	},
	dropdown_display : function() {
		return customClientHandler.getDropdownDisplay();	
	},
	dropdown_icon : function() {
		return customClientHandler.getDropdownIcon();
	},
});

Template['customDropdown'].events({
	'change .custom-dropdown' : function(event) {
		var newCustomValue = event.target.value;
		customClientHandler.onDropdownChange(newCustomValue);
	},
});

