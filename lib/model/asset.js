Asset = new Meteor.Collection('asset');

// Collection2 already does schema checking
// Add custom permission rules if needed
Asset.allow({
    insert : function () {
        return true;
    },
    update : function () {
        return true;
    },
    remove : function () {
        return true;
    }
});

if(Meteor.isServer) {
	Meteor.methods({
		createOrUpdateAsset : function(newAsset){
			Asset.upsert(newAsset._id, newAsset);
		},
		removeAsset : function(id) {
			Asset.remove(id);
		},
		removeAllAssets : function() {
			Asset.remove({});
		},
		removeAllAssetsForApprovalItem : function(itemID) {
			Asset.remove({approval_item_id : itemID});
		},
		copyAllAssetsFromApprovalItem : function(itemID, newItemID) {
			var assetsToCopy = Asset.find({approval_item_id : itemID}).fetch();
			_.map(assetsToCopy, function(asset){
				delete asset['_id'];
				asset['approval_item_id'] = newItemID;
				Asset.insert(asset); 
			});
		},
	});
}

