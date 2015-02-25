settingsWindowHandler.types({
	approval_item_details : {
		header_template : 'approvalItemHeader',
		content_template : 'approvalItemContent',
		on_show : function(params) {
			detailsHandler.showDetails(params['context'], params['is_creating_new']);
		},
		on_hide : function(params) {
			detailsHandler.hideDetails();
		}
	},
});