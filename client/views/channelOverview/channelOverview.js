dataTableHandler.types({
	channel_overview : {
		get_header_text : function() {
			var currentWeek = timeHandler.getWeekForSelectedTime();
			return "Channel Overview " + currentWeek;	
		},
		get_rows : function() {
			return customClientHandler.getCustomOverviewRows();
		},
		get_headers : function() {
			return customClientHandler.getCustomOverviewHeaders();	
		},
		on_week_change : function(clientID, weekID) {
			navHandler.go('channel_overview', {client_id : clientID, week_id : weekID});
		},
	},
});