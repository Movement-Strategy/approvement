customClientHandler = {
	getClientMap : function() {
		return {
			tru_tv : {
				dropdown : {
					get_options : function() {
						return truTVHandler.getShowOptions();
					},
					icon : 'ticket',
					display : 'Show',
					session_variable_to_set : 'current_show_id',
					should_be_shown : function() {
						return Session.get('current_content_type') != null;	
					},
				},
				get_profile_image : function() {
					return truTVHandler.getProfileImage();
				},
				set_fields_in_item : function(item) {
					truTVHandler.setShowInItem(item);
				},
				get_client_name : function() {
					return truTVHandler.getClientName();	
				},
				on_show : function(params) {
					truTVHandler.onShowDetails(params);
				},
				get_popup_title : function(item) {
					return truTVHandler.getPopupTitle(item);	
				},
				get_twitter_profile : function() {
					return truTVHandler.getTwitterProfile();	
				},
				nav_template : 'dynamicNavButtons',
			},
		};	
	},
	getCustomNavTemplate : function() {
		var template = this.runBaseFunction('nav_template');
		template = template == null ? 'modeChangeButton' : template;
		return template;	
	},
	clientIsCustom : function(clientID) {
		var clientMap = this.getClientMap();
		return _.has(clientMap, clientID);	
	},
	handleCustomDraftVariables : function(draftVariableMap) {
		var clientID = Session.get('selected_client_id');
		var updatedMap = {};
		_.map(draftVariableMap, function(variable, id){
			var allowVariable = true;
			if(_.has(variable, 'associated_with')) {
				var associatedWith = variable['associated_with'];
				if(associatedWith != clientID) {
					allowVariable = false;
				}
			}
			if(allowVariable) {
				updatedMap[id] = variable;
			}
		});
		draftVariableMap = updatedMap;
		return draftVariableMap;
	},
	initializeDropdown : function() {
		Meteor.defer(function(){
			$('.custom-dropdown').dropdown();
		});
	},
	getCustomClientName : function() {
		return this.runBaseFunction('get_client_name');	
	},
	getCustomProfileImage : function() {
		return this.runBaseFunction('get_profile_image');	
	},
	getCustomPopupTitle : function(item) {
		return this.runBaseFunction('get_popup_title', item);	
	},
	getCustomTwitterProfile : function() {
		return this.runBaseFunction('get_twitter_profile');	
	},
	onShowDetails : function(item, isCreatingNew) {
		if(isCreatingNew) {
			Session.set(this.getCustomDropdownKey(), null);
		}
		var params = {
			is_creating_new : isCreatingNew,
			item : item,
		};
		this.runBaseFunction('on_show', params);
	},
	customDropdownValueSelected : function() {
		var customDropdownValue = this.getCustomDropdownValue();
		return customDropdownValue != null;
	},
	setCustomFieldsInItem : function(item) {
		var updatedItem = this.runBaseFunction('set_fields_in_item', item);
		return updatedItem == null ? item : updatedItem;
	},
	dropdownShouldBeShown : function() {
		return this.runDropdownFunction('should_be_shown');
	},
	getCustomDropdownKey : function() {
		var key = this.runDropdownFunction('session_variable_to_set');
		return key;
	},
	getCustomDropdownValue : function() {
		var key = this.getCustomDropdownKey();
		return Session.get(key);
	},
	allowPreviewToShow : function() {
		var allowed = true;
		if(this.dropdownIsRequired()) {
			allowed = this.customDropdownValueSelected();
		}
		return allowed;
	},
	getDropdownIcon : function() {
		return this.runDropdownFunction('icon');	
	},
	getDropdownDisplay : function() {
		return this.runDropdownFunction('display');	
	},
	dropdownIsRequired : function() {
		var clientMap = this.getClientMap();
		var clientID = Session.get('selected_client_id');
		var required = false;
		if(_.has(clientMap, clientID)) {
			required = _.has(clientMap[clientID], 'dropdown');
		}
		return required;
	},
	getCustomDropdownOptions : function() {
		return this.runDropdownFunction('get_options');
	},
	onDropdownChange : function(customValue) {
		var keyToSet = this.runDropdownFunction('session_variable_to_set');
		Session.set(keyToSet, customValue);
	},
	runDropdownFunction : function(functionName, params) {
		var value = null;
		var clientMap = this.getClientMap();
		var clientID = Session.get('selected_client_id');
		if(_.has(clientMap, clientID)) {
			if(_.has(clientMap[clientID], 'dropdown')) {
				if(_.has(clientMap[clientID]['dropdown'], functionName)) {
					if(typeof(clientMap[clientID]['dropdown'][functionName]) === 'function') {
						value = clientMap[clientID]['dropdown'][functionName](params);
					} else {
						value = clientMap[clientID]['dropdown'][functionName];
					}
				}
			}
		}
		return value;
	},
	runBaseFunction : function(functionName, params) {
		var value = null;
		var clientMap = this.getClientMap();
		var clientID = Session.get('selected_client_id');
		if(_.has(clientMap, clientID)) {
			if(_.has(clientMap[clientID], functionName)) {
				if(typeof(clientMap[clientID][functionName]) === 'function') {
					value = clientMap[clientID][functionName](params);
				} else {
					value = clientMap[clientID][functionName];
				}
			}
		}
		return value;
	},
}