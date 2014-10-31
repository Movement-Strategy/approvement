Template['dropdownCell'].helpers({
	dropdown_options : function() {
		return this.params.dropdown_options;
	},
	value : function() {
		if(_.has(this, 'value')) {
			return this.value;
		} else {
			return this.params.default_value;
		}
	},
});

Template['dropdownCell'].events({
});

