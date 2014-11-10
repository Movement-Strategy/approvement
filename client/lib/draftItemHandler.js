draftItemHandler = {
	autoRunHandler : null,
	handleDraftItems : function() {
		if(this.autoRunHandler != null) {
			this.autoRunHandler.stop();
		} else {
			this.autoRunHandler = Tracker.autorun(function(){
				draftItemHandler.initializeDraftItems();
			});
		}	
	},
	initializeDraftItems : function() {
		var draftItems = DraftItem.find().fetch();
		var draftItemsByBucketID = {};
		_.map(draftItems, function(item){
			draftItemsByBucketID[item['content_bucket_id']] = item;
		});
		Session.set('draft_items_by_bucket_id', draftItemsByBucketID);
	},
};