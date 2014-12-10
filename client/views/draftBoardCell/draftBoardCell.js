Template['draftBoardCell'].helpers({
	variable_class : function() {
		return draftItemHandler.getDraftVariableClass(this);
	},
	completed_class : function() {
		
	},
});

Template['draftBoardCell'].events({
	'click .draft-action.edit' : function(event) {
		var context = UI.getData(event.target);
		contentBucketModalHandler.showModal(context, false);	
	},
	'click .apply-action' : function(event){
		contentBucketHandler.onClickApplyChanges(event);
	} 
});

