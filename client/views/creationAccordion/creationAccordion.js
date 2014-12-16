Template['creationAccordion'].helpers({
	there_are_comments : function() {
		return Session.get('comment_count') > 0;	
	},
	there_are_assets : function() {
		return Session.get('asset_count') > 0;	
	},
	width_class : function() {
		return detailsHandler.getWidthClass();;
	},
	comment_count : function() {
		return Session.get('comment_count');
	},
	asset_count : function() {
		return Session.get('asset_count');
	}
});

Template['creationAccordion'].events({
});

