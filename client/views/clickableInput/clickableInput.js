
Template['clickableInput'].helpers({
	being_editted : function() {
		return inputBuilder.beingEditted(this.id);
	},
	text_to_display : function() {
		var textToDisplay = inputBuilder.inputTextIsDefault(this) ? "" : this.text;
		return textToDisplay;
	},
});

Template['clickableInput'].events({
	'click'  : function(event) {
		inputBuilder.onInputClick(this);
	},
	'keydown' : function() {
		inputBuilder.onInputKeydown(this);
	},
	'keyup' : function() {
		inputBuilder.onInputKeyup(this);
	},
	'blur .input-text' : function(event) {
		inputBuilder.onInputBlur(this);
	},
	
});

