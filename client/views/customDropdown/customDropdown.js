Template['customDropdown'].helpers({
	initialize : function() {
		customClientHandler.initializeDropdown();
	},
	options : function() {
		return customClientHandler.getCustomDropdownOptions(this);
	},
	dropdown_display : function() {
		return customClientHandler.getDropdownDisplay(this);	
	},
	dropdown_icon : function() {
		return customClientHandler.getDropdownIcon(this);
	},
	show_custom_dropdown : function() {
		return customClientHandler.customDropdownsAreRequired() && customClientHandler.dropdownShouldBeShown(this);	
	},
});

Template['customDropdown'].events({
	'change .custom-dropdown' : function(event) {
		var newCustomValue = event.target.value;
		customClientHandler.onDropdownChange(newCustomValue, this);
	},
});

