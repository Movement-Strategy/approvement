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
	setCurrentlyShownType : function(type) {
		Session.set('shown_settings_window_type', type);	
	},
		
};