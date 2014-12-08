Template['contentTypeDropdownCell'].helpers({
	error_class : function() {
		return draftItemHandler.itemHasError(this) ? 'error' : '';
	},
	dropdown_options : function() {
		return contentTypeBuilder.getCellDropdownOptions(this);
	},
	initializeDropdown : function() {
		contentTypeBuilder.initializeCellDropdown(this);
	},
	style_class : function() {
		return this.params.style_class;
	},
});

Template['contentTypeDropdownCell'].events({
	'click .content-type-item' : function(event) {
		contentTypeBuilder.onClickCellDropdownOption(event);
	},
});

