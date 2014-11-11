Template['dropdownCell'].helpers({
	initializeDropdown : function() {
		draftItemHandler.initializeVariableDropdown(this);
	},
	default_text : function() {
		return this.params.default_value;	
	},
	dropdown_options : function() {
		return this.params.dropdown_options;
	},
	style_class : function() {
		return this.params.style_class;
	},
});

Template['dropdownCell'].events({
});

