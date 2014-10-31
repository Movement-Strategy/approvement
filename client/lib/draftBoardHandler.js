draftBoardHandler = {
	isShown : function() {
		return Session.get('draft_board_is_shown');	
	},
	getTableHeaders : function() {
		var draftVariables = contentBucketHandler.getDraftVariableMap();
		return _.map(draftVariables, function(variable){
			return variable;
		});	
	},
};