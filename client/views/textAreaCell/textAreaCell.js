Template['textAreaCell'].helpers({
	error_class : function() {
		return draftItemHandler.itemHasError(this) ? 'error' : '';
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

