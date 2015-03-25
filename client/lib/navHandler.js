navHandler = {
	getRouteMap : function() {
		var map = {
			content_calendar : {
				initialize_week : true,
				main_content_template : 'contentCalendar',
				get_route : function(clientID, weekID) {
					// return a string of the route
				},
				key_params : {
					mode : 'content_calendar',
					scope : 'window',
				},
			},
		};
		return jQuery.extend(true, {}, map);
	},
	go : function(routeName,  params) {
    	this.getTypeAndRun(routeName, function(typeDetails){
    		
    	});
	},	
	onRouteLoad : function(routeName, params) {
    	this.getTypeAndRun(routeName, function(typeDetails){
	    	if(loginHandler.isLoggedIn()) {
		    	navHandler.handleWeek(typeDetails, params);
	        	settingsWindowHandler.hide();
	        	navHandler.handleContentTemplate(typeDetails);
	        	navHandler.handleKeyMode(typeDetails);
	    	} else {
	        	Router.go('/login');
	    	}
    	});
	},
	handleKeyMode : function(typeDetails) {
		if(_.has(typeDetails, 'key_params')){
			var keyParams = typeDetails['key_params'];
			keyStrokeHandler.setKeyMode(keyParams['scope'], keyParams['mode']);	
		}
	},
	handleWeek : function(typeDetails, params) {
    	if(typeDetails['initialize_week']) {
        	navHandler.initializeWeek(params);
    	}
	},
	handleContentTemplate : function(typeDetails) {
    	if(_.has(typeDetails, 'main_content_template')) {
        	mainContentHandler.showTemplate(typeDetails['main_content_template']);
    	}
	},
	getTypeAndRun : function(type, typeFunction) {
		var output = null;
		var routeMap = this.getRouteMap();
		if(_.has(routeMap, type)){
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