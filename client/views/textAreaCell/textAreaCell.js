Template['textAreaCell'].helpers({
	variable_class : function() {
		return draftItemHandler.getDraftVariableClass(this);
	},
	error_class : function() {
		return draftItemHandler.itemHasError(this) ? 'error' : '';
	},
	placeholder : function() {
		return this.params.placeholder;	
	},
	initializeTextArea : function() {
		Meteor.defer(function(){
			$('textarea.content-input').autosize();
			$('textarea.content-input').trigger('autosize.resize');
		});
	},
});

Template['textAreaCell'].events({
	'keyup .content-input' : function(event) {
		keyStrokeHandler.handleKeyStrokesOnInput('up', event, this);
	},
	'focus .content-input' : function(event) {
		contentBucketHandler.changeToTextAreaKeyMode();
	},
	'blur .content-input' : function(event) {
		draftBoardHandler.changeToKeyMode();
	},
	
		
});

keyStrokeHandler.types('input', {
	text_area_cell : {
		on_key_up : function(event, context) {
			contentBucketHandler.onTextAreaKeyup(event);
		},
		on_escape_down : function(event, context) {
			contentBucketHandler.onTextAreaEscapePress();
		},
	},
});

