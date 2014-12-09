draftBoardHandler = {
	isShown : function() {
		return Session.get('draft_board_is_shown');	
	},
	popupSelector : '.draft-action',
	getTableHeaders : function() {
		var draftVariables = contentBucketHandler.getDraftVariableMap();
		return _.map(draftVariables, function(variable){
			return variable;
		});	
	},
	initializeRowPopups : function() {
		Meteor.defer(function(){
			$(draftBoardHandler.popupSelector).popup();
		});
	},
	hideAllPopups : function() {
		$(this.popupSelector).popup('hide');
	}
};