navigator = {
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
    	this.getTypeAndRun(routeName, function(typeDetails){
	    	if(loginHandler.isLoggedIn()) {
	        	if(typeDetails['initialize_week']) {
		        	navigator.initializeWeek(params);
	        	}
	        	settingsWindowHandler.hide();
	        	mainContentHandler.showTemplate('contentCalendar');
	        	calendarBuilder.changeToKeyMode();
	    	} else {
	        	Router.go('/login');
	    	}
    	});
	},
	
	getTypeAndRun : function(type, typeFunction) {
		var output = null;
		var routeMap = this.getRouteMap();
		if(_.has(routeMap[type])){
			var typeDetails = routeMap[type];
			output = typeFunction(typeDetails);
		}
		return output;
	},
	initializeWeek : function(params) {
        var clientID = params.client;
        var weekID = params.week;
        
        warningMessageHandler.resetMessage();
        if(clientID != Session.get('selected_client_id')) {
	       
	        Session.set('approval_items_are_ready', false);
	        Session.set('selected_client_id', clientID);
        }
        Session.set('draft_variables_to_update', {});
        
		var newTimestamp = timeHandler.dateStringToStartOfWeekTimestamp(weekID);
		var currentTimestamp = timeHandler.getTimestampForCurrentDate();
		if(currentTimestamp != newTimestamp) {
			Session.set('approval_items_are_ready', false);
			timeHandler.setCurrentTimestampToStartOfWeekForDateString(weekID);
		}
	},
};