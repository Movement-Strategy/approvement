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
		});
	},
});

Template['textAreaCell'].events({
	'keyup .content-input' : function(event) {
		contentBucketHandler.onTextAreaKeyup(event);
	}
});

