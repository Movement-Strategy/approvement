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
		contentBucketHandler.onTextAreaKeyup(event);
	},
	'focus .content-input' : function(event) {
		Session.set('entering_draft_item_text', true);
	},
	'blur .content-input' : function(event) {
		Session.set('entering_draft_item_text', false);
	},
	
		
});

