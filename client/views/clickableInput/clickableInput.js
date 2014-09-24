
Template['clickableInput'].helpers({
	being_editted : function() {
		return inputBuilder.beingEditted(this.id);
	},
	text_to_display : function() {
		return inputBuilder.inputTextIsDefault(this) ? "" : this.text;
	}
});

Template['clickableInput'].events({
	'click'  : function(event) {
		inputBuilder.onInputClick(this);
	},
	'keydown' : function() {
		inputBuilder.onInputKeydown(this);
	},
	'blur .input-text' : function(event) {
		inputBuilder.onInputBlur(this);
	},
	
});

