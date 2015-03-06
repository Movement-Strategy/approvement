draftLinkHandler = {
	changeToKeyMode : function() {
		keyStrokeHandler.setKeyMode('input', 'asset_cell');
	},
	onEnterPress : function() {
		var bucketID = Session.get('edited_draft_link');
		var link = $('#' + Session.get('edited_draft_link')).val();
		contentBucketHandler.setDraftVariableToUpdate(link, 'link', bucketID);
		Session.set('edited_draft_link', null);
		draftBoardHandler.changeToKeyMode();	
	},
	onAddLink : function(event) {
		var targetID = '#' + event.target.id;
		$(targetID).popup('hide');
		Session.set('edited_draft_link', event.target.id);
		Meteor.flush();
		var element = document.getElementById(event.target.id);
		$(element).focus();
	}
	
};