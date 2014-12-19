Template['actionCell'].helpers({
});

Template['actionCell'].events({

	'click .draft-action.edit' : function(event) {
		var context = UI.getData(event.target);
		contentBucketModalHandler.showModal(context, false);	
	},
	'click .apply-action' : function(event){
		var context = UI.getData(event.target);
		var bucketID = context['content_bucket_id'];
		Session.set('bucket_id_to_apply', bucketID);
		promptModalHandler.show('apply_changes');
	}
});

