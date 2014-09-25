


Template['editCreationAsset'].helpers({
	edit_value : function() {
		return assetHandler.getAssetContent();
	},
});

Template['editCreationAsset'].events({
	'keydown' : function(event) {
		assetHandler.onAssetInputKeydown(event);
	},
	'blur' : function() {
		assetHandler.resetAndTriggerAnimationOnAsset(Session.get('current_asset_id'), 'shake');
	},
	'click .delete-asset' : function() {
		promptModalHandler.show('asset');
	},
});

