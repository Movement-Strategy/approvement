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
	},
});