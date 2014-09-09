var assetMap = {
	image : {
		icon : 'photo',
		display_name : 'Image',
	},
	link : {
		icon : 'external url',
		display_name : 'Link',
	},
};

Template['creationAssets'].helpers({
	width_class : function() {
		return getWidthClass();
	},
	assets : function() {
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
		
		assets = _.map(assets, function(asset){
			asset['icon'] = assetMap[asset['type']]['icon'];
			asset['display_name'] = assetMap[asset['type']]['display_name'];
			return asset;
		});
		
		return assets;
	}
});

Template['creationAssets'].events({
});

