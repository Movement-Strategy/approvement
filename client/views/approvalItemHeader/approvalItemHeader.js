Template['approvalItemHeader'].helpers({
	day_description : function() {
		return timeHandler.getDayDescription();
	},
	network_type_name : function() {
		return networkTypeBuilder.getTypeName();
	},
	creating_new_item : function() {
		return detailsHandler.creatingNewItem();
	},
});

Template['approvalItemHeader'].events({
});

