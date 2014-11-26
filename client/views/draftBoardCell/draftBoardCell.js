Template['draftBoardCell'].helpers({
});

Template['draftBoardCell'].events({
	'click .draft-action.edit' : function(event) {
		var context = UI.getData(event.target);
		contentBucketModalHandler.showModal(context);	
	},
	'click .apply-action' : function(event){
		contentBucketHandler.onClickApplyChanges(event);
	} 
});

