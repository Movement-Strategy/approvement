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
        	calendarBuilder.initializeCalendarWeek(params.client, params.week);
        	settingsWindowHandler.hide();
        	mainContentHandler.showTemplate('contentCalendar');
        	calendarBuilder.changeToKeyMode();
    	} else {
        	Router.go('/login');
    	}
	}
};