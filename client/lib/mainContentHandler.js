mainContentHandler = {
	getTemplateMap : function() {
		return {
			'contentCalendar' : {
				on_change : function(clientID, weekID) {
					calendarBuilder.goToNewWeek(clientID, weekID);
				},
			},
			'draftBoard' : {
				on_change : function(clientID, weekID) {
					draftItemHandler.goToDraftWeek(clientID, weekID);
				},
			},
		};
	}, 
	changeToTemplate : function(templateName, clientID, weekID) {
		var onChange = this.getOnChangeFunction(templateName, clientID, weekID);
		if(onChange) {
			onChange(clientID, weekID);
		}
	},
	goToWeek : function(clientID, weekID) {
		this.changeToTemplate(this.getCurrentTemplate(), clientID, weekID);
	},
	getOnChangeFunction : function(templateName, clientID, weekID) {
		var onChange = null;
		var templateMap = this.getTemplateMap();
		if(templateMap[templateName]) {
			var templateDetails = templateMap[templateName];
			if(templateDetails.on_change) {
				templateDetails['on_change'](clientID, weekID);
			}
		}
		return onChange;
	},
	showTemplate : function(templateName) {
		Session.set('main_content_template', templateName);
	},
	isShown : function(templateName) {
		return Session.equals('main_content_template', templateName);
	},
	getCurrentTemplate : function() {
		return Session.get('main_content_template');
	},
};