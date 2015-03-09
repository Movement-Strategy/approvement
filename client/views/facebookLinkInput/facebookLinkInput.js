Template['facebookLinkInput'].helpers({
	width_class : function() {
		return detailsHandler.getWidthClass();
	},
	editing_link : function() {
		return facebookHandler.editingLink();
	},
	show_link_input : function() {
		return facebookHandler.showLinkInput();
	},
	facebook_link : function() {
		return facebookHandler.getLinkToDisplay();
	},
	loader_class : function(){
		return Session.get('link_is_loading') ? 'active' : '';
	},
});

Template['facebookLinkInput'].events({
	'click .facebook-link-display'  : function() {
		facebookHandler.onClickFacebookLink();
	},
	'keydown .facebook-link-input' : function(event) {
		keyStrokeHandler.handleKeyStrokesOnInput('down', event, this);
	},
	'focus .facebook-link-input' : function() {
		facebookHandler.changeToLinkKeyMode();
	},
	'blur .facebook-link-input' : function(event) {
		facebookHandler.submitLinkUpdate();	
	}
});

keyStrokeHandler.types('input', {
	approval_item_link : {
		on_enter_down : function() {
			facebookHandler.submitLinkUpdate();
		},
		on_escape_down : function() {
			facebookHandler.submitLinkUpdate();	
		},
	},
});
