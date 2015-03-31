settingsWindowHandler.types({
	approval_item_details : {
		header_template : 'approvalItemHeader',
		content_template : 'approvalItemContent',
		on_show : function(params) {
			Session.set('details_params', params);
		},
		on_hide : function(params) {
			detailsHandler.onHideDetails();
		},
		allow_hide : function() {
			return !Session.get('changes_made');
		},
		on_prevent_hide : function() {
			promptModalHandler.show('exit_asset');	
		},
		on_enter_down : function(event, context) {
			detailsHandler.onEnterPress();
		},
		
	},
});