handleAssetID = function() {
	Deps.autorun(function(){
		var assetID = Session.get('current_asset_id');
		var currentAssets = Session.get('current_assets');	
		if(assetID != null && currentAssets != null) {
			Session.set('current_asset', currentAssets[assetID]);
		}
	});
	
}

Template['creationAssetIcon'].helpers({
	
});

Template['creationAssetIcon'].events({
	'click .edit-icon' : function(event) {
		var clickedID = event.currentTarget.id;
		Session.set('current_asset_id', clickedID);
	}
});

