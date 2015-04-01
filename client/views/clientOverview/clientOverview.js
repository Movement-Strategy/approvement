dataTableHandler.types({
	client_overview : {
		get_header_text : function() {
			return clientOverviewHandler.getHeaderText();
		},
		get_rows : function() {
			return clientOverviewHandler.getProcessedRows();
		},
		get_headers : function() {
			return clientOverviewHandler.getHeaders();
		},
		on_week_change : function(clientID, weekID) {
			navHandler.go('client_overview', {client_id : clientID, week_id : weekID});
		},
	},
});