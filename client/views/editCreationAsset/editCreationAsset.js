


Template['editCreationAsset'].helpers({
	edit_value : function() {
		return assetHandler.getAssetContent();
	},
});

Template['editCreationAsset'].events({
	'keydown' : function(event) {
		keyStrokeHandler.handleKeyStrokesOnInput('down', event, this);
	},
	'focus' : function() {
		assetHandler.changeToKeyMode();	
	},
	'blur' : function() {
		assetHandler.onEnterPress();
	},
	'click .delete-asset' : function() {
		promptModalHandler.show('asset');
	},
});

keyStrokeHandler.types('input', {
	creation_asset : {
		on_enter_down : function(event, context) {
			assetHandler.onEnterPress();
		},
		on_escape_down : function(event, context) {
			assetHandler.onEnterPress();	
		},
	},
});


