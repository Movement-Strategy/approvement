Template['facebookLinkInput'].helpers({
	width_class : function() {
		return detailsHandler.getWidthClass();
	},
	editing_link : function() {
		return facebookHandler.editingLink();
	},
	show_link_input : function() {
		return contentTypeBuilder.isType('link');
	},
	facebook_link : function() {
		return facebookHandler.getFacebookLink();
	},
});

Template['facebookLinkInput'].events({
	'click .facebook-link-display'  : function() {
		facebookHandler.onClickFacebookLink();
	},
	'keydown .facebook-link-input' : function(event) {
		facebookHandler.onLinkInputKeydown(event);
	},
	'focus .facebook-link-input' : function() {
		Session.set('details_can_close', false);
	}
});

