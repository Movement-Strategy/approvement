handleAssetID = function() {
	Deps.autorun(function(){
		var assetID = Session.get('current_asset_id');
		var currentAssets = Session.get('current_assets');	
		if(assetID != null && currentAssets != null) {
			var asset = currentAssets[assetID];
			Session.set('current_asset', asset);
			Session.set('current_asset_type', asset.type);
		}
	});
}

Template['creationAssetIcon'].helpers({
});

Template['creationAssetIcon'].events({
	'click .edit-icon' : function(event) {
		var clickedID = event.currentTarget.id;
		Session.set('current_asset_id', clickedID);
		Session.set('details_can_close', false);
	}
});

