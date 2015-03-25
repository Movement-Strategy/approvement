navHandler = {
	sessionKey : 'current_route',
	isOnRoute : function(routeName) {
		return this.getCurrentRoute() == routeName;
	},
	getCurrentRoute : function() {
		return Session.get(this.sessionKey);	
	},
	getRouteMap : function() {
		var map = {
			content_calendar : {
				initialize_week : true,
				main_content_template : 'contentCalendar',
				on_route_load : function(){
					settingsWindowHandler.hide();
				},
				get_route : function(clientID, weekID) {
					return '/client/' + clientID + '/week/' + weekID;
				},
				key_params : {
					mode : 'content_calendar',
					scope : 'window',
				},
			},
			client_overview : {
				initialize_week : true,
				main_content_template : 'dataTable',
				get_route : function(clientID, weekID) {
					return '/week/' + weekID + '/overview';
				},
				on_route_load : function() {
		        	Session.set('page_is_ready', true);
		        	Session.set('draft_variables_to_update', {});
		        	Session.set('error_on_convert', false);
					dataTableHandler.show('client_overview');
				},
			},
			show_overview : {
				initialize_week : true,
				main_content_template : 'dataTable',
				get_route : function(clientID, weekID) {
					return '/client/' + clientID + '/week/' + weekID + '/shows';
				},
				on_route_load : function() {
		        	Session.set('draft_variables_to_update', {});
		        	Session.set('error_on_convert', false);
					dataTableHandler.show('show_overview');
				},
			},
			draft_board : {
				initialize_week : true,
				main_content_template : 'draftBoard',
				denied_user_types : [
					'client',
				],
				get_route : function(clientID, weekID) {
					return '/client/' + clientID + '/week/' + weekID + '/draft';
				},
				on_route_load : function() {
		        	Session.set('draft_variables_to_update', {});
		        	Session.set('error_on_convert', false);
				},
				key_params : {
					mode : 'draft_board',
					scope : 'window',
				},
			},
			
			
			
		};
		return jQuery.extend(true, {}, map);
	},
	go : function(routeName,  params) {
    	if(params == null) {
	    	params = {};
    	}
    	this.getTypeAndRun(routeName, function(typeDetails){
    		var clientID = _.has(params, 'client_id') ? params['client_id'] : Session.get('selected_client_id');
    		var weekID = _.has(params, 'week_id') ? params['week_id'] : timeHandler.getWeekForSelectedTime();
    		var route = typeDetails['get_route'](clientID, weekID);
    		Router.go(route);
    	});
	},
	onRouteLoad : function(routeName, params) {
    	this.getTypeAndRun(routeName, function(typeDetails){
	    	if(loginHandler.isLoggedIn() && !navHandler.userIsDenied(typeDetails)) {
		    	navHandler.handleWeek(typeDetails, params);
	        	navHandler.handleContentTemplate(typeDetails);
	        	navHandler.handleKeyMode(typeDetails);
	        	navHandler.handleRouteLoad(typeDetails);
	        	Session.set(navHandler.sessionKey, routeName);
	    	} else {
	        	Router.go('/login');
	    	}
    	});
	},
	onNavButtonClick : function(buttonName) {
    	this.getTypeAndRun(buttonName, function(typeDetails){
    		navHandler.go(buttonName);
    	});
	},
	userIsDenied : function(typeDetails) {
		isDenied = false;
		if(_.has(typeDetails, 'denied_user_types')){
			isDenied = this.isInArray(typeDetails['denied_user_types'], Session.get('user_type'));
		}
		return isDenied;
	},
	isInArray : function(array, value) {
		return array.indexOf(value) > -1;	
	},
	handleRouteLoad : function(typeDetails) {
		if(_.has(typeDetails, 'on_route_load')){
			typeDetails['on_route_load']();
		}
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