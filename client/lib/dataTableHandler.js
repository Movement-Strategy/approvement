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
		keyStrokeHandler.setKeyMode('window', 'settings_window');
	},
	getKeyForShownType : function(key) {
		var type = this.getCurrentlyShownType();
		return type == null ? null : this.getKeyForType(type, key);
	},
	getCurrentlyShownType : function() {
		return Session.get(this.sessionKey);
	},
	getHeaderTemplate : function() {
		return this.getKeyForShownType('header_template');	
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
		return Session.equals(this.sessionKey, type);
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
		settingsWindowHandler.getTypeAndRun(settingsWindowHandler.getCurrentlyShownType(), {}, function(typeDetails){
			if(_.has(typeDetails, eventName)){
				typeDetails[eventName](event, context);
			} else {
				defaultFunction();
			}
		});
	},
		
};