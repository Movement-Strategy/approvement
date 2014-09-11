createOrUpdateAsset = function(url) {
	var assetID = Session.get('current_asset_id');
	var newID = 'asset_' + new Date().getTime();
	assetID = assetID == null ? newID : assetID;
	var newAsset = {
		_id : assetID,
		client_id : Session.get('selected_client_id'),
		approval_item_id : Session.get('current_item_id'),
		type : Session.get('current_asset_type'),
		url : url,
	};
	Meteor.call('createOrUpdateAsset', newAsset, function(error){
		resetAndTriggerAnimationOnAsset(assetID, 'pulse');
	});
}

handleAssets = function() {
	Deps.autorun(function(){
		var approvalItemID = Session.get('current_item_id');
		if(Session.get('current_item_id') != null) {
			var assets = Asset.find({approval_item_id : approvalItemID}).fetch();		
			var indexedAssets = {};
			
			_.map(assets, function(asset){
				indexedAssets[asset._id] = asset;
			});
			
			// set the newly created assets
			Session.set('current_assets', indexedAssets);
		}
	});
}

var assetMap = {
	image : {
		icon : 'photo',
		display_name : 'Main Image',
	},
	link : {
		icon : 'external url',
		display_name : 'External URL',
	},
	video : {
		icon : 'video',
		display_name : 'Video',
	},
};

Template['creationAssets'].helpers({
	initializeDropdown : function() {
		Meteor.defer(function(){
			$('.create-asset').dropdown();
		});
	},
	width_class : function() {
		return getWidthClass();
	},
	editing_asset : function() {
		return Session.get('current_asset_type') != null;
	},
	asset_types : function() {
		return _.map(assetMap, function(asset, type){
			asset['type'] = type;
			return asset;
		});
	},
	assets : function() {
		
		assets = _.map(Session.get('current_assets'), function(asset){
			asset['icon'] = assetMap[asset['type']]['icon'];
			asset['display_name'] = assetMap[asset['type']]['display_name'];
			return asset;
		});
		
		return assets;
	}
});

Template['creationAssets'].events({
	'click .asset-type' : function(event){
		var assetType = $(event.target).data().value;
		Session.set('current_asset_type', assetType);
		Session.set('details_can_close', false);
	}
});

