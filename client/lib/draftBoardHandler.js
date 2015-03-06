draftBoardHandler = {
	isShown : function() {
		return mainContentHandler.isShown('draftBoard');
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
	},
	changeToKeyMode : function() {
		keyStrokeHandler.setKeyMode('window', 'draft_board');	
	},
};