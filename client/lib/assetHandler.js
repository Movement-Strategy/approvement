assetHandler = {
	subscribeToAssets : function() {
		if(Session.get('selected_client_id') != null) {
			Meteor.subscribe('asset', Session.get('selected_client_id'));
		}
	},
	resetAndTriggerAnimationOnAsset : function(assetID, animationName) {
		this.resetAssetTemplate();
		var selector = '#' + assetID;
		$(selector).transition(animationName, onHide = function(){
			Session.set('details_can_close', true);
		});
	},
	resetAssetTemplate : function() {
		this.resetAssetState();
		Meteor.flush();
		Meteor.defer(function(){
			$('.create-asset').dropdown();
		});
	},
	getAssetTypes : function() {
		return _.map(this.assetMap, function(asset, type){
			asset['type'] = type;
			return asset;
		});
	},
	editingAsset : function() {
		return Session.get('current_asset_type') != null;
	},
	initializeAssetDropdown : function() {
		Meteor.defer(function(){
			$('.create-asset').dropdown();
		});
	},
	resetAssetState : function() {
		Session.set('current_asset_id', null);
		Session.set('current_asset', null);
		Session.set('current_asset_type', null);
	},
	getAssets : function() {
		assets = _.map(Session.get('current_assets'), function(asset){
			asset['icon'] = assetHandler.assetMap[asset['type']]['icon'];
			asset['display_name'] = assetHandler.assetMap[asset['type']]['display_name'];
			return asset;
		});
		
		return assets;
	},
	createOrUpdateAsset : function(url){
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
			assetHandler.resetAndTriggerAnimationOnAsset(assetID, 'pulse');
		});
	},
	updateCurrentAssets : function() {
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
	},
	handleAssetID : function() {
		Deps.autorun(function(){
			var assetID = Session.get('current_asset_id');
			var currentAssets = Session.get('current_assets');	
			if(assetID != null && currentAssets != null) {
				var asset = currentAssets[assetID];
				Session.set('current_asset', asset);
				Session.set('current_asset_type', asset.type);
			}
		});
	},
	assetMap : {
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
	},
};