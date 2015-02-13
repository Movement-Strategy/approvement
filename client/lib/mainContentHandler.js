mainContentHandler = {
	showTemplate : function(templateName) {
		Session.set('main_content_template', templateName);
	},
	isShown : function(templateName) {
		return Session.equals('main_content_template', templateName);
	},
	shownTemplate : function() {
		return Session.get('main_content_template');
	}
};