Template['draftBoardRow'].helpers({
	completed_class : function() {
		return contentBucketHandler.rowIsCompleted(this) ? 'completed' : '';
	},
	draft_variables : function() {
		return contentBucketHandler.getDraftVariablesForRow(this);
	},
});

Template['draftBoardRow'].events({
});

