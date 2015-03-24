Navigator = {
	getRouteMap : function() {
		var map = {
			initialize_week : true,
			main_content_template : 'contentCalendar',
			get_route : function(clientID, weekID) {
				// return a string of the route
			},
		};
		return jQuery.extend(true, {}, map);
	},
	onRouteLoad : function(routeName, params) {
    	if(loginHandler.isLoggedIn()) {
        	this.initializeWeek(params.client, params.week);
        	settingsWindowHandler.hide();
        	mainContentHandler.showTemplate('contentCalendar');
        	calendarBuilder.changeToKeyMode();
    	} else {
        	Router.go('/login');
    	}
	},
	initializeWeek : function(clientID, weekName) {
        warningMessageHandler.resetMessage();
        if(clientID != Session.get('selected_client_id')) {
	       
	        Session.set('approval_items_are_ready', false);
	        Session.set('selected_client_id', clientID);
        }
        
        
        
        Session.set('draft_variables_to_update', {});
        
		var newTimestamp = timeHandler.dateStringToStartOfWeekTimestamp(weekName);
		var currentTimestamp = timeHandler.getTimestampForCurrentDate();
		if(currentTimestamp != newTimestamp) {
			Session.set('approval_items_are_ready', false);
			timeHandler.setCurrentTimestampToStartOfWeekForDateString(weekName);
		}
	},
};