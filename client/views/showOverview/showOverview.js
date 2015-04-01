dataTableHandler.types({
	show_overview : {
		get_header_text : function() {
			return truTVHandler.getHeaderText();
		},
		get_rows : function() {
			return customClientHandler.getCustomOverviewRows();
		},
		get_headers : function() {
			return customClientHandler.getCustomOverviewHeaders();	
		},
		on_week_change : function(clientID, weekID) {
			navHandler.go('show_overview', {client_id : clientID, week_id : weekID});
		},
	},
});