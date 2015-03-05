
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
	'keydown' : function(event) {
		keyStrokeHandler.handleKeyStrokesOnInput('down', event, this);
	},
	'keyup' : function() {
		keyStrokeHandler.handleKeyStrokesOnInput('up', event, this);
	},
	'focus .input-text' : function(event) {
		inputBuilder.onInputFocus(this);
	},
	'blur .input-text' : function(event) {
		inputBuilder.onInputBlur(this);
	},
	
});

keyStrokeHandler.types('input',{
	clickable_input : {
		on_enter_down : function(event, context) {
			inputBuilder.onEnterPress(context);
		},
		on_escape_down : function(event, context) {
			inputBuilder.onEnterPress(context);	
		},
		on_key_down : function(event, context) {
			inputBuilder.onKeyPress(context);	
		},
		on_shift_down : function(event, context) {
			inputBuilder.onShiftPress();	
		},
		on_shift_up : function(event, context) {
			inputBuilder.onShiftRelease();	
		},
	},
});


