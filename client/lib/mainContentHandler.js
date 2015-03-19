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
			'dataTable' : {
				on_change : function(clientID, weekID) {
					dataTableHandler.onWeekChange(clientID, weekID);
				},
			},
		};
	}, 
	onClickDynamicButton : function(context) {
		if(_.has(context, 'change_to_template')) {
			var newTemplate = context.change_to_template;
			var clientID = Session.get('selected_client_id');
			var weekID = timeHandler.getWeekForSelectedTime();
			this.changeToTemplate(newTemplate, clientID, weekID);
		}
	},
	getDynamicButtons : function() {
		var templateMap = this.getTemplateMap();
		var currentTemplate = this.getCurrentTemplate();
		return _.chain(templateMap)
			.map(function(templateDetails, templateName){
				eliminated = userHandler.userIsType('client') && templateName == 'draftBoard';
				if(templateName != currentTemplate && !eliminated) {
					return {
						change_to_template : templateName,
						button_text : templateDetails.button_text,
					};
				}
			})
			.compact()
		.value();
	},
	changeToTemplate : function(templateName, clientID, weekID) {
		var onChange = this.getOnChangeFunction(templateName, clientID, weekID);
		navButtonHandler.hidePopups();
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