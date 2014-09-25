
Template['creationAssetIcon'].helpers({
	popup_content : function() {
		return assetHandler.getPopupContent(this);
	},
});

Template['creationAssetIcon'].events({
	'click .edit-icon' : function(event) {	
		assetHandler.onClickAssetIcon(event);
	}
});

