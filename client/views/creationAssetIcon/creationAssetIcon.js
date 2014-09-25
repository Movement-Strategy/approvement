
Template['creationAssetIcon'].helpers({
	popup_content : function() {
		return assetHandler.getPopupContent(this);
	},
});

Template['creationAssetIcon'].events({
	'click .edit-icon' : function(event) {	
		var clickedID = event.currentTarget.id;
		$('#' + clickedID).popup('hide');
		Session.set('current_asset_id', clickedID);
		Session.set('details_can_close', false);
	}
});

