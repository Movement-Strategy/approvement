dataTableHandler.types({
	show_overview : {
		header_text : function() {
			return 'test';
			// call dataTableHandler
		},
		get_rows : function() {
			return [];
			// call customClientHandler.getCustomOverviewRows();
		},
		get_headers : function() {
			return [];
			// call customClientHandler.getCustomOverviewHeaders();	
		},	
	},
});