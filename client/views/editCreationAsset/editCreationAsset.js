Template['editCreationAsset'].helpers({
	edit_value : function() {
		return Session.get('current_asset').url ? Session.get('current_asset').url : "";
	},
});

Template['editCreationAsset'].events({
	'keydown' : function(event) {
		
	}
});

