resetAssetTemplate = function() {
	resetAssetState();
	Meteor.flush();
	Meteor.defer(function(){
		$('.create-asset').dropdown();
	});
}

resetAndTriggerAnimationOnAsset = function(assetID, animationName) {
	resetAssetTemplate();
	var selector = '#' + assetID;
	$(selector).transition(animationName, onHide = function(){
		Session.set('details_can_close', true);
	});
}

resetAssetState = function() {
	Session.set('current_asset_id', null);
	Session.set('current_asset', null);
	Session.set('current_asset_type', null);
}

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
			createOrUpdateAsset($('.input-asset').val());
		}
		if(event.which == 27) {
			resetAndTriggerAnimationOnAsset(Session.get('current_asset_id'), 'shake');		
		}
	},
	'blur' : function() {
		resetAndTriggerAnimationOnAsset(Session.get('current_asset_id'), 'shake');
	},
	'click .delete-asset' : function() {
		Meteor.call('removeAsset', Session.get('current_asset_id'));
		resetAssetTemplate();
	},
});

