draftLinkHandler = {
	handleEnter : function() {
		var bucketID = Session.get('edited_draft_link');
		var link = $('#' + Session.get('edited_draft_link')).val();
		contentBucketHandler.setDraftVariableToUpdate(link, 'link', bucketID);
		Session.set('edited_draft_link', null);
	},
	handleEscape : function() {
		Session.set('edited_draft_link', null);
	},
	
};