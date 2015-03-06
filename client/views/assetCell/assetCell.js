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
	'keydown .draft-link-input' : function(event) {
		keyStrokeHandler.handleKeyStrokesOnInput('down', event, this);	
	},
	'click .edit-draft-link' : function(event) {
		popupContent.handlePopup('.edit-draft-link', 'hide all');
		draftLinkHandler.onAddLink(event);
	},
	'focus .draft-link-input' : function() {
		draftLinkHandler.changeToKeyMode();	
	},
	'blur .draft-link-input' : function() {
		draftLinkHandler.onEnterPress();
	},
});

keyStrokeHandler.types('input', {
	asset_cell : {
		on_enter_down : function() {
			draftLinkHandler.onEnterPress();
		},
		on_escape_down : function() {
			draftLinkHandler.onEnterPress();
		},
	},
});

