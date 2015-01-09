Template['assetCell'].helpers({
	being_edited : function() {
		return this.content_bucket_id == Session.get('edited_draft_link');	
	},
	popup_content : function() {
		popupContent.handlePopup('.edit-draft-link', {});
		return this.value == null ? 'Add Link' : this.value;
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
		popupContent.handlePopup('.edit-draft-link', 'hide');
		Session.set('edited_draft_link', event.target.id);
	},
	'blur .draft-link-input' : function() {
		draftLinkHandler.handleEnter();
	},
});

