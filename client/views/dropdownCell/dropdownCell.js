Template['dropdownCell'].helpers({
	default_text : function() {
		return this.params.default_value;	
	},
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
	style_class : function() {
		return this.params.style_class;
	},
});

Template['dropdownCell'].events({
});

