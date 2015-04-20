customClientHandler = {
	getClientMap : function() {
		return {
			tru_tv : {
				dropdowns : {
					show : {
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
				},
				get_overview_headers : function() {
					return truTVHandler.getColumnHeaders();	
				},
				get_overview_rows : function() {
					return truTVHandler.getOverviewRows();	
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
			xero : {
				dropdowns : {
					region : {
						get_options : function() {
							return xeroHandler.getRegionOptions();
						},
						icon : 'mail',
						display : 'Region',
						session_variable_to_set : 'current_region_id',
						should_be_shown : function() {
							return Session.get('current_content_type') != null;	
						},
					},
					channel : {
						get_options : function() {
							return xeroHandler.getChannelOptions();
						},
						icon : 'ticket',
						display : 'Channel',
						session_variable_to_set : 'current_channel_id',
						should_be_shown : function() {
							return Session.get('current_content_type') != null && Session.get('current_region_id') != null;	
						},
					},
					
				},
				get_overview_headers : function() {
					return xeroHandler.getColumnHeaders();	
				},
				get_overview_rows : function() {
					return xeroHandler.getOverviewRows();
				},
				get_profile_image : function() {
					return null;
				},
				set_fields_in_item : function(item) {
					return xeroHandler.setRegionAndChannelInItem(item);
				},
				get_client_name : function() {
					return clientHandler.getStandardClientName();
				},
				on_show : function(params) {
// 					truTVHandler.onShowDetails(params);
				},
				get_popup_title : function(item) {
					return xeroHandler.getPopupTitle(item);
				},
				get_twitter_profile : function() {
					return clientHandler.getStandardTwitterProfileName();	
				},
				nav_template : 'dynamicNavButtons',
			},
		};	
	},
	getCustomOverviewHeaders : function() {
		return this.runBaseFunction('get_overview_headers');		
	},
	getCustomOverviewRows : function() {
		return this.runBaseFunction('get_overview_rows');	
	},
	clientIsCustom : function(clientID) {
		var clientMap = this.getClientMap();
		return _.has(clientMap, clientID);	
	},
	handleCustomDraftVariables : function(draftVariableMap) {
		var clientID = clientHandler.getSelectedClientID();
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
			this.resetCustomValues();
		}
		var params = {
			is_creating_new : isCreatingNew,
			item : item,
		};
		this.runBaseFunction('on_show', params);
	},
	resetCustomValues : function() {
		var dropdowns = this.runBaseFunction('dropdowns');
		_.map(dropdowns, function(dropdowns, dropdownID){
			var sessionKey = customClientHandler.runDropdownFunction('session_variable_to_set', {dropdown_id : dropdownID});
			Session.set(sessionKey, null);
		});
	},
	allCustomDropdownValuesSelected : function() {
		var dropdowns = this.runBaseFunction('dropdowns');
		var allSelected = true;
		_.map(dropdowns, function(dropdown){
			var customValue = Session.get(dropdown['session_variable_to_set']);
			if(customValue == null) {
				allSelected = false;
			}
		});
		return allSelected;
	},
	setCustomFieldsInItem : function(item) {
		var updatedItem = this.runBaseFunction('set_fields_in_item', item);
		return updatedItem == null ? item : updatedItem;
	},
	dropdownShouldBeShown : function(context) {
		return this.runDropdownFunction('should_be_shown', context);
	},
	getCustomDropdownKey : function() {
		var key = this.runDropdownFunction('session_variable_to_set');
		return key;
	},
	allowPreviewToShow : function() {
		var allowed = true;
		if(this.customDropdownsAreRequired()) {
			allowed = this.allCustomDropdownValuesSelected();
		}
		return allowed;
	},
	getDropdownIcon : function(context) {
		return this.runDropdownFunction('icon', context);	
	},
	getDropdownDisplay : function(context) {
		return this.runDropdownFunction('display', context);	
	},
	customDropdownsAreRequired : function() {
		var clientMap = this.getClientMap();
		var clientID = clientHandler.getSelectedClientID()
		var required = false;
		if(_.has(clientMap, clientID)) {
			required = _.has(clientMap[clientID], 'dropdowns');
		}
		return required;
	},
	getCustomDropdowns : function() {
		var dropdowns = this.runBaseFunction('dropdowns');
		dropdowns =  _.map(dropdowns, function(dropdown, dropdownID){
			return {
				dropdown_id : dropdownID,
			};
		});
		return dropdowns;
	},
	getCustomDropdownOptions : function(context) {
		return this.runDropdownFunction('get_options', context);
	},
	onDropdownChange : function(customValue,  context) {
		var keyToSet = this.runDropdownFunction('session_variable_to_set', context);
		Session.set(keyToSet, customValue);
	},
	runDropdownFunction : function(functionName, params) {
		var value = null;
		var clientMap = this.getClientMap();
		var clientID = clientHandler.getSelectedClientID();
		if(params != null && _.has(params, 'dropdown_id')) {
			var dropdownID = params['dropdown_id'];
			if(_.has(clientMap, clientID)) {
				if(_.has(clientMap[clientID], 'dropdowns')) {
					if(_.has(clientMap[clientID]['dropdowns'], dropdownID)) {
						var dropdownMap = clientMap[clientID]['dropdowns'][dropdownID];
						if(_.has(dropdownMap, functionName)) {
							if(typeof(dropdownMap[functionName]) === 'function') {
								value = dropdownMap[functionName](params);
							} else {
								value = dropdownMap[functionName];
							}
						}
					}
				}
			}
		}
		
		return value;
	},
	runBaseFunction : function(functionName, params) {
		var value = null;
		var clientMap = this.getClientMap();
		var clientID = clientHandler.getSelectedClientID();
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