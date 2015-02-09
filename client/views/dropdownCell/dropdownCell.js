Template['dropdownCell'].helpers({
	display_value : function() {
		var dropdownOptions = draftItemHandler.getDropdownOptionsForCell(this);
		return contentBucketHandler.getDisplayForValue(this.value, dropdownOptions);
	},
	variable_class : function() {
		return draftItemHandler.getDraftVariableClass(this);
	},
	initializeDropdown : function() {
		draftItemHandler.initializeVariableDropdown(this);
	},
	error_class : function() {
		return draftItemHandler.itemHasError(this) ? 'error' : '';
	},
	default_text : function() {
		return this.params.default_value;	
	},
	
	dropdown_options : function() {
		return draftItemHandler.getDropdownOptionsForCell(this);
	},
	style_class : function() {
		return this.params.style_class;
	},
});

Template['dropdownCell'].events({
});

