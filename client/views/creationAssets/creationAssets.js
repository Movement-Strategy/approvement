


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
		return assetHandler.getAssetTypes();
	},
	assets : function() {
		return assetHandler.getAssets();
	}
});

Template['creationAssets'].events({
	'click .asset-type' : function(event){
		assetHandler.onClickAssetTypeOption(event);
	}
});

