dataTableHandler = {
	sessionKey : 'shown_data_table_type',
	currentTypes : {},
	types : function(typesToSet) {
		_.map(typesToSet, function(typeDetails, typeName){
			dataTableHandler.currentTypes[typeName] = typeDetails;
		});
	},
	getTypeDetails : function(typeName) {
		return jQuery.extend(true, {}, this.currentTypes[typeName]);
	},
	getTypeAndRun : function(type, params, typeFunction) {
		var typeDetails = this.getTypeDetails(type);
		return typeFunction(typeDetails, params);
	},
	getKeyForType : function(type, key) {
		return this.getTypeAndRun(type, {}, function(typeDetails){
			return _.has(typeDetails, key) ? typeDetails[key] : null;
		});
	},
	changeToKeyMode : function() {
		keyStrokeHandler.setKeyMode('window', 'data_table');
	},
	getKeyForShownType : function(key) {
		var type = this.getCurrentlyShownType();
		return type == null ? null : this.getKeyForType(type, key);
	},
	getRows : function() {
		var rowFunction = this.getKeyForShownType('get_rows');
		if(rowFunction) {
			return rowFunction();
		} else {
			return [];
		}
	},
	onWeekChange : function(clientID, weekID) {
		
		var weekChangeFunction = this.getKeyForType(this.getCurrentlyShownType(), 'on_week_change');
		if(weekChangeFunction) {
			return weekChangeFunction(clientID, weekID);
		}
	},
	getCurrentlyShownType : function() {
		return Session.get(this.sessionKey);
	},
	getHeaders : function() {
		var headerFunction = this.getKeyForShownType('get_headers');
		if(headerFunction) {
			return headerFunction();
		} else {
			return [];
		}
	},
	getHeaderText : function() {
		var getHeaderText = this.getKeyForShownType('get_header_text');
		if(getHeaderText) {
			return getHeaderText();
		} else {
			return [];
		}
	},
	getContentTemplate : function() {
		return this.getKeyForShownType('content_template');	
	},
	isShown : function() {
		return !Session.equals(this.sessionKey, null);
	},
	setCurrentlyShownType : function(type) {
		Session.set(this.sessionKey, type);	
	},
	typeIsShown : function(type) {
		return Session.equals(this.sessionKey, type) && mainContentHandler.isShown('dataTable');
	},
	show : function(type, params){
		this.getTypeAndRun(type, params, function(typeDetails){
			var onShow = _.has(typeDetails, 'on_show') ? typeDetails['on_show'] : null;
			if(onShow) {
				onShow(params);
			}
			mainContentHandler.showTemplate('dataTable');
			dataTableHandler.setCurrentlyShownType(type);
			dataTableHandler.changeToKeyMode();
		});
	},
	passAlongKeyEvent : function(eventName, event, context, defaultFunction) {
		dataTableHandler.getTypeAndRun(dataTableHandler.getCurrentlyShownType(), {}, function(typeDetails){
			
			if(_.has(typeDetails, eventName)){
				
				typeDetails[eventName](event, context);
			} else {
				console.log('non default');
				defaultFunction();
			}
		});
	},
		
};