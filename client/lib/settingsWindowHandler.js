	settingsWindowHandler = {
	currentTypes : {},
	types : function(typesToSet) {
		_.map(typesToSet, function(typeDetails, typeName){
			settingsWindowHandler.currentTypes[typeName] = typeDetails;
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
	getKeyForShownType : function(key) {
		var type = this.getCurrentlyShownType();
		return type == null ? null : this.getKeyForType(type, key);
	},
	getCurrentlyShownType : function() {
		return Session.get('shown_settings_window_type');
	},
	getHeaderTemplate : function() {
		return this.getKeyForShownType('header_template');	
	},
	getContentTemplate : function() {
		return this.getKeyForShownType('content_template');	
	},
	isShown : function() {
		return !Session.equals('shown_settings_window_type', null);
	},
	setCurrentlyShownType : function(type) {
		Session.set('shown_settings_window_type', type);	
	},
	typeIsShown : function(type) {
		return Session.equals('shown_settings_window_type', type);
	},
	show : function(type, params){
		this.getTypeAndRun(type, params, function(typeDetails){
			var onShow = _.has(typeDetails, 'on_show') ? typeDetails['on_show'] : null;
			if(onShow) {
				onShow(params);
			}
			mainContentHandler.showTemplate('settingsWindow');
			settingsWindowHandler.setCurrentlyShownType(type);
		});
	},
	hide : function() {
		var params = {};
		var type = settingsWindowHandler.getCurrentlyShownType();
		this.getTypeAndRun(type, params, function(typeDetails){
			var onHide = _.has(typeDetails, 'on_hide') ? typeDetails['on_hide'] : null;
			if(onHide) {
				onHide(params);
			}
			settingsWindowHandler.setCurrentlyShownType(null);
		});
	},
		
};