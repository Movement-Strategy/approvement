contentBucketHandler = {
	getDraftVariableMap : function() {
		return {
			description : {
				required : false,
				display : "Content Bucket",
				cell_template : 'draftBoardCell',
				get_value : function(draftItemID, bucketID) {
					return Session.get('content_buckets_by_id')[bucketID]['description'];
				},
				width : 'two',
			},
			day_of_week : {
				required : true,
				display : "Day of week",
				cell_template : "dropdownCell",
				add_to_approval_item : function(item, dayIndex) {
					var scheduledTime = timeHandler.getTimestampForDayIndexOfCurrentWeek(dayIndex);
					item['scheduled_time'] = scheduledTime;
					return item;
				},
				default_value : 'Day',
				params : {
					style_class : 'day-cell-dropdown',
					dropdown_options : [
						{
							value : 1,
							display : 'Monday',
						},
						{
							value : 2,
							display : 'Tuesday',
						},
						{
							value : 3,
							display : 'Wednesday',
						},
						{
							value : 4,
							display : 'Thursday',
						},
						{
							value : 5,
							display : 'Friday',
						},
						{
							value : 6,
							display : 'Saturday',
						},
						{
							value : 7,
							display : 'Sunday',
						},
					],
				},
				width : 'one',
			},
			network : {
				required : true,
				display : "Network",
				cell_template : "dropdownCell",
				add_to_approval_item : function(item, draftValue) {
					item['type'] = draftValue;
					return item;
				},
				default_value : 'Select',
				params : {
					style_class : 'draft-network-dropdown',
					on_change : function(value, context) {
						contentBucketHandler.setDraftVariableToUpdate('unset', 'content_type', context.content_bucket_id);
					},
					dropdown_options : [
						{
							value : 'facebook',
							display : 'Facebook',
						},
						{
							value : 'twitter',
							display : 'Twitter',
						},
						{
							value : 'instagram',
							display : 'Instagram',
						},
						{
							value : 'linked',
							display : 'LinkedIN',
						},
					],
				},
				width : 'one',
			},
			content_type : {
				required : true,
				display : "Content Type",
				cell_template : "contentTypeDropdownCell",
				add_to_approval_item : function(item, draftValue) {
					item['content_type'] = draftValue;
					return item;
				},
				params : {
					style_class : 'draft-content-dropdown',
					default_value : 'Select',
				},
				width : 'one',
			},
			actions : {
				required : false,
				display : "Actions",
				cell_template : "actionCell",
				width : 'one',
			},
			content : {
				required : true,
				display : "Content",
				cell_template : 'textAreaCell',
				add_to_approval_item : function(item, draftValue, draftItemID, bucketID) {
					var contentType = contentBucketHandler.getValueForDraftVariable('content_type', draftItemID, bucketID);
					var networkType = contentBucketHandler.getValueForDraftVariable('network', draftItemID, bucketID);
					var inputName = inputBuilder.getInputNameForContentBucket(networkType, contentType);
					if(!_.has(item, 'contents')) {
						item['contents'] = {};
					}
					item['contents'][inputName] = draftValue;
					return item;
				},
				params : {
					placeholder : "Enter content here",
				},
				width : 'three',
			},
			image : {
				required : false,
				display : "Image",
				cell_template : 'imageCell',
				width : 'two',
				add_to_approval_item : function(item, draftValue, draftItemID, bucketID) {
					if(!_.has(item, 'contents')) {
						item['contents'] = {};
					}
					if(draftValue != null) {
						item['contents']['image_url'] = draftValue;
					}
					return item;
				}
			},			
			link : {
				required : {
					facebook : [
						'link',
					],
				},
				display : "Link",
				cell_template : 'assetCell',
				add_to_approval_item : function(item, draftValue, draftItemID, bucketID) {
					var draftValueMissing = draftValue == 'null' || draftValue == '';
					if(!_.has(item, 'contents')) {
						item['contents'] = {};
					}
					item['contents']['facebook_link'] = draftValue;
					return item;
				},
				width : 'one',
			},
		};	
	},
	variableIsRequired : function(variable) {
		var required = false;
		var requiredStatus = variable.required;
		if(typeof requiredStatus === 'object') {
			required = this.variableIsRequiredForNetworkAndType(requiredStatus, variable.draft_item_id, variable.content_bucket_id);
		} else {
			required = requiredStatus;
		}
		
		return required;
	},
	variableIsRequiredForNetworkAndType : function(requiredStatus, draftItemID, bucketID) {
		var required = false;
		var networkType = this.getValueForDraftVariable('network', draftItemID, bucketID);
		var contentType = this.getValueForDraftVariable('content_type', draftItemID, bucketID);
		if(_.has(requiredStatus, networkType)) {
			var requiredForNetwork = requiredStatus[networkType];
			
			// check if the content is in the required for network array
			if(requiredForNetwork.indexOf(contentType) > -1) {
				var required = true;
			}
		}
		return required;
	},
	handleContentBuckets : function() {
		Tracker.autorun(function(){
			if(Session.get('draft_board_is_shown')) {
				var query = contentBucketHandler.getContentBucketQuery();
				var contentBuckets = ContentBucket.find(query).fetch();
				contentBucketHandler.initializeContentBuckets(contentBuckets);
			}
		});
	},
	onClickApplyChanges : function(event) {
		var context = UI.getData(event.target);
		var bucketID = context['content_bucket_id'];
		this.applyChangesToContentBucket(bucketID);
	},
	applyChangesToContentBucket : function(bucketID) {
		var draftItemID = contentBucketHandler.getDraftItemIDForContentBucket(bucketID);
		var updatedValues = {};
		_.map(this.getDraftVariableMap(), function(variable, variableID){
			var updatedValue = contentBucketHandler.getValueForDraftVariable(variableID, draftItemID, bucketID);
			if(updatedValue != null) {
				updatedValues[variableID] = updatedValue;
			}
		});
		var updateQuery = draftItemHandler.convertIndexedArrayIntoUpdateQuery(updatedValues);
		Meteor.call('updateContentBucket', bucketID, updateQuery, function(error, result){
			warningMessageHandler.showMessage("Repeating Bucket Updated", "success");
			draftBoardHandler.hideAllPopups();
		});
	},
	getBucketByID : function(bucketID) {
		return Session.get('content_buckets_by_id')[bucketID];	
	},
	getContentBucketQuery : function() {
		var baseQuery = {
			week : timeHandler.timestampToDateString(timeHandler.getTimestampForCurrentDate()),
			client_id : Session.get('selected_client_id'),
		};
		return {
			$or : [
				baseQuery,
				{
					client_id : Session.get('selected_client_id'),
					repeats : true,
				},
			],
		};
	},
	initializeModalToggle : function() {
		var bucket = Session.get('current_content_bucket');
		
		if(bucket) {
			var isRepeating = bucket['repeats'];
			var onStart = isRepeating ? 'enable' : 'disable';
			Meteor.defer(function(){
				var onEnable = function() {
					Session.set('bucket_is_repeating', true);	
				};
				var onDisable = function() {
					Session.set('bucket_is_repeating', false);	
				};
				
				$('.ui.checkbox.repeats-toggle').checkbox(onStart).checkbox('setting', {onEnable : onEnable, onDisable : onDisable});
			});
		}
	},
	rowIsCompleted : function(row) {
		var draftVariablesForRow = this.getDraftVariablesForRow(row);
		var allVariablesFilledIn = true;
		_.map(draftVariablesForRow, function(variable, variableName){
			if(allVariablesFilledIn && contentBucketHandler.variableIsRequired(variable)) {
				var variableMissing = variable['value'] == null || variable['value'] == '';
				if(allVariablesFilledIn && variableMissing) {
					allVariablesFilledIn = false;
				}
			}
		});
		return allVariablesFilledIn;
	},
	initializeContentBuckets : function(contentBuckets) {
		var contentBucketsByID = {};
		_.map(contentBuckets, function(bucket){
			contentBucketsByID[bucket['_id']] = bucket;
		});
		Session.set('content_buckets_by_id', contentBucketsByID);
	},
	getValueFromContentBucket : function(variableID, bucketID) {
		
		var value = null
		var contentBucketsByID = Session.get('content_buckets_by_id');
		if(_.has(contentBucketsByID, bucketID)) {
			var contentBucket = contentBucketsByID[bucketID];
			
			if(_.has(contentBucket['draft_variables'], variableID)) {
				var draftVariable = contentBucket['draft_variables'][variableID];
				value = _.has(draftVariable, 'value') ? draftVariable['value'] : null;
			}
		}
		return value;	
	},
	getValueFromDraftVariablesToUpdate : function(variableID, bucketID) {
		var value = null;
		var draftVariablesByID = Session.get('draft_variables_to_update');
		if(_.has(draftVariablesByID, bucketID)) {
			draftVariablesForBucket = draftVariablesByID[bucketID];
			if(_.has(draftVariablesForBucket, variableID)) {
				var value = draftVariablesForBucket[variableID];
			}
		}
		return value;	
	},
	getDraftVariableValue : function(variableID, bucketID) {
		var value = this.getValueFromDraftVariablesToUpdate(variableID, bucketID);
		if(value == null) {
			value = this.getValueFromContentBucket(variableID, bucketID);
		}
		return value == 'unset' ? null : value;
	},
	afterConvertingDraftItems : function() {
		calendarBuilder.onModeChangeClick();
		Meteor.defer(function(){
			warningMessageHandler.showMessage("Draft items converted successfully", "success");
		});
	},
	convertAllDraftItemsToApprovalItems : function() {
		Session.set('error_on_convert', false);
		var contentBucketsByID = Session.get('content_buckets_by_id');
		_.map(contentBucketsByID, function(bucket, bucketID){
			var draftItemID = contentBucketHandler.getDraftItemIDForContentBucket(bucketID);
			var approvalItem = contentBucketHandler.convertDraftItemIntoApprovalItem(draftItemID, bucketID);
			if(approvalItem && !Session.get('error_on_convert')) {
				Meteor.call('insertApprovalItem', approvalItem);
			} else {
				Session.set('error_on_convert', true);
			}
		});
		if(!Session.get('error_on_convert')) {
			this.afterConvertingDraftItems();
		} else {
			warningMessageHandler.showMessage("Conversion Failed : Please fill in any highlighted missing options", "error");
		}
	},
	convertDraftItemIntoApprovalItem : function(draftItemID, bucketID) {
		var hasError = false;
		var approvalItem = {};
		_.map(this.getDraftVariableMap(), function(variable, variableID){
			var draftValue = contentBucketHandler.getValueForDraftVariable(variableID, draftItemID, bucketID);
			if(contentBucketHandler.variableIsRequired(variable)) {
				hasError = draftValue == null || draftValue == '';
			}
			if(!hasError) {
				approvalItem = contentBucketHandler.addDraftVariableToApprovalItem(approvalItem, draftValue, variableID, draftItemID, bucketID);
			}
		});
		
		if(hasError) {
			return false;
		} else {
			approvalItem = this.addFinalConfigurationToApprovalItem(approvalItem);
			return approvalItem;
		}
	},
	addDraftVariableToApprovalItem : function(approvalItem, draftValue, variableID, draftItemID, bucketID) {
		var variableMap = this.getDraftVariableMap();
		if(_.has(variableMap[variableID], 'add_to_approval_item')) {
			approvalItem = variableMap[variableID]['add_to_approval_item'](approvalItem, draftValue, draftItemID, bucketID);
		}
		return approvalItem;
	},
	addFinalConfigurationToApprovalItem : function(approvalItem) {
		approvalItem['scope'] = 'private';
		approvalItem['client_id'] = Session.get('selected_client_id');
		approvalItem['created_time'] = timeHandler.convertDateToTimestamp(moment());
		approvalItem['status'] = 'created';
		approvalItem['created_by'] = Meteor.userId();
		return approvalItem;
	},
	setDraftVariableToUpdate : function(newValue, variableID, bucketID) {
		var variablesToUpdate = Session.get('draft_variables_to_update');
		if(!_.has(variablesToUpdate, bucketID)) {
			variablesToUpdate[bucketID] = {};
		}
		if(!_.has(variablesToUpdate[bucketID], 'draft_variables')) {
			variablesToUpdate[bucketID]['draft_variables'] = {};
		}
		
		variablesToUpdate[bucketID]['draft_variables'][variableID] = newValue;
		Session.set('draft_variables_to_update', variablesToUpdate);
		this.updateContentBuckets();
	},
	updateContentBuckets : function() {
		var variablesToUpdate = Session.get('draft_variables_to_update');
		_.map(variablesToUpdate, function(bucket, bucketID){
			draftItemHandler.updateDraftItemForContentBucket(bucket, bucketID);
		});
		Session.set('draft_variables_to_update', {});
	},
	onDropdownChange : function(value, text, element) {
		var context = UI.getData(element);
		this.handleVariableChange(context['variable_id'], value, context);
		this.setDraftVariableToUpdate(value, context['variable_id'], context['content_bucket_id']);
	},
	handleVariableChange : function(variableID, value, context) {
		var params = _.has(this.getDraftVariableMap()[variableID], 'params') ? this.getDraftVariableMap()[variableID]['params'] : {};
		if(_.has(params, 'on_change')) {
			params['on_change'](value, context);
		}
	},
	onTextAreaKeyup : function(event) {
		var context = UI.getData(event.target);
		this.setDraftVariableToUpdate(event.target.value, context['variable_id'], context['content_bucket_id']);
	},
	configureDraftVariable : function(variableDetails, variableName, draftVariables) {
		if(_.has(draftVariables, variableName)) {
			
			// set the value from the included variable in the variable details map
			variableDetails['value'] = draftVariables[variableName];
			draftVariables[variableName] = variableDetails;
		}
		
		draftVariables[variableName] = variableDetails;
		return draftVariables;
	},
	getDraftItemIDForContentBucket : function(bucketID) {
		
		var draftItemsByBucketID = Session.get('draft_items_by_bucket_id');
		return _.has(draftItemsByBucketID, bucketID) ? draftItemsByBucketID[bucketID]['_id'] : null;
	},
	getContentBuckets : function() {
		contentBuckets = _.map(Session.get('content_buckets_by_id'), function(bucket, bucketID){
			var draftItemID = contentBucketHandler.getDraftItemIDForContentBucket(bucketID);
			var draftVariables = contentBucketHandler.getDraftVariablesForBucket(bucketID, draftItemID);
			bucket['draft_variables'] = draftVariables;
			bucket['content_bucket_id'] = bucketID;
			bucket['draft_item_id'] = draftItemID;
			return bucket;
		});
		
		Session.set('bucket_count', contentBuckets.length);
		return contentBuckets;
	},
	getDraftVariablesForBucket : function(bucketID, draftItemID) {
		var draftVariables = {};
		_.map(this.getDraftVariableMap(), function(variableDetails, variableID){
			var value = contentBucketHandler.getValueForDraftVariable(variableID, draftItemID, bucketID);
			draftVariables[variableID] = value;
		});
		return draftVariables;
	},
	getValueForDraftVariable : function(variableID, draftItemID, bucketID) {
		var value = null;
		if(_.has(this.getDraftVariableMap()[variableID], 'get_value')) {
			value = this.getDraftVariableMap()[variableID]['get_value'](draftItemID, bucketID);
		} else {
			var draftVariablesToUpdate = Session.get('draft_variables_to_update');
			value = this.getValueFromArrayWithBucketID(draftVariablesToUpdate, variableID, bucketID);
			if(value == null) {
				var draftItemsByBucketID = Session.get('draft_items_by_bucket_id');
				value = this.getValueFromArrayWithBucketID(draftItemsByBucketID, variableID, bucketID);
				if(value == null) {
					var contentBucketsByID = Session.get('content_buckets_by_id');
					value = this.getValueFromArrayWithBucketID(contentBucketsByID, variableID, bucketID);
				}
			}
		}
		return value == 'unset' ? null : value;
	},
	getValueFromArrayWithBucketID : function(array, variableID, bucketID) {
		var value = null;
		if(_.has(array, bucketID)){
			var subArray = array[bucketID];
			if(_.has(subArray, 'draft_variables')) {
				var draftVariables = subArray['draft_variables'];
				if(_.has(draftVariables, variableID)){
					value = draftVariables[variableID];
				}
			}
		}
		return value;
	},
	getDraftVariablesForRow : function(row) {
		var contentBucketID = row['_id'];
		var draftVariables = _.has(row, 'draft_variables') ?  row['draft_variables'] : [];
		draftVariables = _.map(row.draft_variables, function(variable, variableName){
			var draftVariable = contentBucketHandler.getDraftVariableMap()[variableName];
			draftVariable['value'] = variable;
			draftVariable['draft_item_id'] = row.draft_item_id;
			draftVariable['content_bucket_id'] = contentBucketID;
			draftVariable['variable_id'] = variableName;
			return draftVariable;
		});	
		return draftVariables;
	},
};