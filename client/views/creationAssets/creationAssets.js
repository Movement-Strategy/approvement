generateNewAsset = function(newType) {
	var assetID = new Date().getTime();
	var newAsset = {
		id : assetID,
		type : newType,
		url : '',
	};
	Session.set('new_asset', newAsset);
	Session.set('current_asset_id', assetID);
}

handleAssets = function() {
	Deps.autorun(function(){
		var assets = [
			{
				id : '1000',
				url : 'www.google.com',
				type : 'image',
			},
			{
				id : '2000',
				url : 'www.espn.com',
				type : 'link',
			},
		];
		
		var indexedAssets = {};
		
		_.map(assets, function(asset){
			indexedAssets[asset.id] = asset;
		});
		
		// set the newly created assets
		var newAsset = Session.get('new_asset');
		if(Session.get('new_asset') != null) {
			indexedAssets[newAsset.id] = newAsset;
		}
		
		Session.set('current_assets', indexedAssets);
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
		return Session.get('current_asset_id') != null;
	},
	asset_types : function() {
		return _.map(assetMap, function(asset, type){
			asset['type'] = type;
			return asset;
		});
	},
	edit_value : function() {
		return Session.get('current_asset').url ? Session.get('current_asset').url : "";
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
		generateNewAsset(assetType);
	}
});

