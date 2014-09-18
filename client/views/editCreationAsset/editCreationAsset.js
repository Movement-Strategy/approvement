


Template['editCreationAsset'].helpers({
	edit_value : function() {
		var currentAsset = Session.get('current_asset');
		if(currentAsset) {
			return _.has(currentAsset, 'url') ? currentAsset.url : "";
		} else {
			return "";
		}
	},
});

Template['editCreationAsset'].events({
	'keydown' : function(event) {
		if(event.which == 13) {
			assetHandler.createOrUpdateAsset($('.input-asset').val());
		}
		if(event.which == 27) {
			assetHandler.resetAndTriggerAnimationOnAsset(Session.get('current_asset_id'), 'shake');		
		}
	},
	'blur' : function() {
		assetHandler.resetAndTriggerAnimationOnAsset(Session.get('current_asset_id'), 'shake');
	},
	'click .delete-asset' : function() {
		promptModalHandler.show('asset');
	},
});

