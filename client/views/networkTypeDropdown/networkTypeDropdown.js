
Template['networkTypeDropdown'].helpers({
	initialize : function() {
		networkTypeBuilder.initializeDropdown();
	},
});

Template['networkTypeDropdown'].events({
	'change .network-type-dropdown' : function(event) {
		var newNetworkType = event.target.value;
		networkTypeBuilder.onNetworkTypeChange(newNetworkType);
	},
});

