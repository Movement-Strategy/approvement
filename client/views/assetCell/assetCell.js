Template['assetCell'].helpers({
	being_edited : function() {
		return this.content_bucket_id == Session.get('edited_draft_link');	
	},
	error_class : function() {
		return draftItemHandler.itemHasError(this) ? 'error' : '';
	},
	initializeTextArea : function() {
		Meteor.defer(function(){
			$('textarea.draft-link-input').autosize();
		});
	},
	icon_class : function() {
		var isEmpty = this.value == null || this.value == '';
		return isEmpty ? 'plus' : 'external url inverted';
	},
	
});

Template['assetCell'].events({
	'click .edit-draft-link' : function(event) {
		Session.set('edited_draft_link', event.target.id);
	},
});

