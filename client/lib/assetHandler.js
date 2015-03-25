assetHandler = {
	subscribeToAssets : function() {
		if(clientHandler.clientIsSelected()) {
			Meteor.subscribe('asset', clientHandler.getSelectedClientID());
		}
	},
	resetAndTriggerAnimationOnAsset : function(assetID, animationName) {
		this.resetAssetTemplate();
		var selector = '#' + assetID;
		$(selector).transition(animationName, onHide = function(){
			settingsWindowHandler.changeToKeyMode();
		});
	},
	getAssetContent : function () {
		var currentAsset = Session.get('current_asset');
		if(currentAsset) {
			return _.has(currentAsset, 'url') ? currentAsset.url : "";
		} else {
			return "";
		}
	},
	changeToKeyMode : function() {
		keyStrokeHandler.setKeyMode('input', 'creation_asset');	
	},
	onEnterPress : function() {
		assetHandler.createOrUpdateAsset($('.input-asset').val());
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
	getPopupContent : function(context) {
		var selector = '#' + context._id;
		this.initializeAssetPopup(selector);
		return "<span class='asset-content'>" + context.url + '</span>';
	},
	initializeAssetPopup : function(selector) {
		Meteor.defer(function(){
			$(selector).popup({
				position : 'top center',
			});
		});
	},
	onClickAssetTypeOption : function(event) {
		var assetType = $(event.target).data().value;
		Session.set('current_asset_type', assetType);
		this.setFocusToAssetInput();
	},
	initializeAssetDropdown : function() {
		Meteor.defer(function(){
			$('.create-asset').dropdown();
		});
	},	
	setFocusToAssetInput : function() {
		Meteor.flush();
		var element = document.getElementsByClassName('input-asset')[0];
		element.focus();
	},
	onClickAssetIcon : function(event) {
		var clickedID = event.currentTarget.id;
		$('#' + clickedID).popup('hide');
		Session.set('current_asset_id', clickedID);
		this.setFocusToAssetInput();
	},
	editingAsset : function() {
		return Session.get('current_asset_type') != null && !userHandler.userIsType('client');
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
		
		Session.set('asset_count', assets.length);
		
		return assets;
	},
	generateAssetID : function() {
		var newID = 'asset_' + new Date().getTime();
		return newID;
	},
	createOrUpdateAsset : function(url){
		var assetID = Session.get('current_asset_id');
		var newID = assetHandler.generateAssetID();
		assetID = assetID == null ? newID : assetID;
		var newAsset = {
			_id : assetID,
			client_id : clientHandler.getSelectedClientID(),
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
				assetHandler.handleClientClick(asset);
			}
		});
	},
	handleClientClick : function(asset) {
		if(userHandler.userIsType('client')) {
			var url = _.has(asset, 'url') ? asset.url : '';
			url = this.addHttp(url);
			var windowHandler = window.open(url, '_blank');
			windowHandler.focus();
			Session.set('details_can_close', true);
			this.resetAssetState();
		}	
	},
	addHttp : function(url){
	   if (!/^(f|ht)tps?:\/\//i.test(url)) {
	      url = "http://" + url;
	   }
	   return url;
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
		photo_credit : {
			icon : 'camera',
			display_name : 'Photo Credits',
		},
		video : {
			icon : 'video',
			display_name : 'Video',
		},
		sources : {
			icon : 'info',
			display_name: 'Sources / References',
		},
	},
};