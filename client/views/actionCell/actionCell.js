Template['actionCell'].helpers({
});

Template['actionCell'].events({

	'click .draft-action.edit' : function(event) {
		var context = UI.getData(event.target);
		contentBucketModalHandler.showModal(context, false);	
	},
	'click .apply-action' : function(event){
		contentBucketHandler.onClickApplyChanges(event);
	} 
});

