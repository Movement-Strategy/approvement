


Template['creationAssets'].helpers({
	initializeDropdown : function() {
		assetHandler.initializeAssetDropdown();
	},
	width_class : function() {
		return detailsHandler.getWidthClass();
	},
	editing_asset : function() {
		return assetHandler.editingAsset();
	},
	asset_types : function() {
		assetHandler.getAssetTypes();
	},
	assets : function() {
		return assetHandler.getAssets();
	}
});

Template['creationAssets'].events({
	'click .asset-type' : function(event){
		var assetType = $(event.target).data().value;
		Session.set('current_asset_type', assetType);
		Session.set('details_can_close', false);
	}
});

