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
					var draftValueMissing = draftValue == null || draftValue == '';
					if(!_.has(item, 'contents')) {
						item['contents'] = {};
					}
					
					if(!draftValueMissing) {
						item['contents']['facebook_link'] = draftValue;
					}
					
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
				contentBucketHandler.initializeContentBuckets();
			}
		});
	},
	onClickApplyChanges : function() {
		this.applyChangesToContentBucket(Session.get('bucket_id_to_apply'));
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
		var draftItemsByBucketID = Session.get('draft_items_by_bucket_id');
		var bucketIDs = _.keys(draftItemsByBucketID);
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
				{
					_id : {
						'$in' : bucketIDs,
					},
				},
				
			],
		};
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
	initializeContentBuckets : function() {
		var query = contentBucketHandler.getContentBucketQuery();
		var contentBuckets = ContentBucket.find(query).fetch();
		var contentBucketsByID = {};
		_.map(contentBuckets, function(bucket){
			contentBucketsByID[bucket['_id']] = bucket;
		});
		Session.set('content_buckets_by_id', contentBucketsByID);
	},
	tryToConvertBucketsToApprovalItems : function() {
		Session.set('error_on_convert', false);
		var contentBucketsByID = Session.get('content_buckets_by_id');
		var bucketsHaveErrors = this.contentBucketsHaveErrors(contentBucketsByID);
		if(!bucketsHaveErrors)  {
			this.onSuccessfulBucketConversion(contentBucketsByID)	
		} else {
			this.onFailedBucketConversion();
		}
	},
	onSuccessfulBucketConversion : function(contentBucketsByID) {
		var bucketsToConvert = this.getBucketsToConvert(contentBucketsByID);
		if(_.size(bucketsToConvert) > 0) {
			this.convertCompletedBucketsToApprovalItems(bucketsToConvert);
			this.afterConvertingDraftItems(bucketsToConvert);
		} else {
			warningMessageHandler.showMessage("No buckets to convert", "info");
		}
	},
	onFailedBucketConversion : function() {
		Session.set('error_on_convert', true);
		warningMessageHandler.showMessage("Conversion Failed : Please fill in any highlighted missing options", "error");
	},
	convertCompletedBucketsToApprovalItems : function(bucketsToConvert) {
		_.map(bucketsToConvert, function(bucket, bucketID){
			var draftItemID = contentBucketHandler.getDraftItemIDForContentBucket(bucketID);
			var approvalItem = contentBucketHandler.convertBucketIntoApprovalItem(bucketID, draftItemID);
			Meteor.call('insertApprovalItem', approvalItem);
		});
	},
	convertBucketIntoApprovalItem : function(bucketID, draftItemID) {
		var approvalItem = {};
		approvalItem = this.addAllDraftVariablesToApprovalItem(approvalItem, bucketID, draftItemID);
		approvalItem = this.addFinalConfigurationToApprovalItem(approvalItem);
		return approvalItem;
	},
	addAllDraftVariablesToApprovalItem : function(approvalItem, bucketID, draftItemID) {
		_.map(this.getDraftVariableMap(), function(variable, variableID){
			var draftValue = contentBucketHandler.getValueForDraftVariable(variableID, draftItemID, bucketID);
			approvalItem = contentBucketHandler.addDraftVariableToApprovalItem(approvalItem, draftValue, variableID, draftItemID, bucketID);
		});
		return approvalItem;
	},
	afterConvertingDraftItems : function(bucketsToConvert) {
		this.setDraftItemsAsConverted(bucketsToConvert);
		calendarBuilder.onModeChangeClick();
		Meteor.defer(function(){
			warningMessageHandler.showMessage("Draft items converted successfully", "success");
		});
	},
	bucketHasBeenConverted : function(bucketID) {
		var converted = false;
		var draftItemsByBucketID = Session.get('draft_items_by_bucket_id');
		var draftItem = _.has(draftItemsByBucketID, bucketID) ? draftItemsByBucketID[bucketID] : null;
		if(draftItem) {
			converted = _.has(draftItem, 'converted') ? draftItem['converted'] : false;
		}
		return converted;
	},
	setDraftItemsAsConverted : function(bucketsToConvert) {
		var draftItemIDs = _.map(bucketsToConvert, function(bucket, bucketID){
			return contentBucketHandler.getDraftItemIDForContentBucket(bucketID);
		});
		Meteor.call('setDraftItemsAsConverted', draftItemIDs);
	},
	thereAreBucketsToConvert : function() {
		var contentBucketsByID = Session.get('content_buckets_by_id');
		var nonConvertedBuckets = _.filter(contentBucketsByID, function(bucket, bucketID) {
			return !contentBucketHandler.bucketHasBeenConverted(bucketID);
		});
		return _.size(nonConvertedBuckets) > 0;	
	},
	getBucketsToConvert : function(contentBucketsByID) {
		var bucketsToConvert = {};
		_.map(contentBucketsByID, function(bucket, bucketID){
			var draftItemID = contentBucketHandler.getDraftItemIDForContentBucket(bucketID);
			var bucketHasErrors = contentBucketHandler.bucketHasErrors(draftItemID, bucketID);
			if(!bucketHasErrors && !contentBucketHandler.bucketHasBeenConverted(bucketID)) {
				bucketsToConvert[bucketID] = bucket;
			}
		});
		return bucketsToConvert;
	},
	contentBucketsHaveErrors : function(contentBucketsByID) {
		var bucketsWithErrors = _.filter(contentBucketsByID, function(bucket, bucketID){
			var draftItemID = contentBucketHandler.getDraftItemIDForContentBucket(bucketID);
			var bucketIsRequired = _.has(bucket, 'required') ? bucket['required'] : false;
			return bucketIsRequired ? contentBucketHandler.bucketHasErrors(draftItemID, bucketID) : false;
		});
		return bucketsWithErrors.length > 0;
	},
	bucketHasErrors : function(draftItemID, bucketID) {
		var draftVariablesWithErrors = _.filter(this.getDraftVariableMap(), function(variable, variableID){
			return contentBucketHandler.draftVariableHasError(variable, variableID, draftItemID, bucketID);
		});
		return draftVariablesWithErrors.length > 0;
	},
	draftVariableHasError : function(variable, variableID, draftItemID, bucketID) {
		var draftValue = contentBucketHandler.getValueForDraftVariable(variableID, draftItemID, bucketID);
		if(contentBucketHandler.variableIsRequired(variable)) {
			return hasError = draftValue == null || draftValue == '';
		} else {
			return false;
		}
	},
	addDraftVariableToApprovalItem : function(approvalItem, draftValue, variableID, draftItemID, bucketID) {
		var variableMap = this.getDraftVariableMap();
		if(_.has(variableMap[variableID], 'add_to_approval_item')) {
			approvalItem = variableMap[variableID]['add_to_approval_item'](approvalItem, draftValue, draftItemID, bucketID);
		}
		return approvalItem;
	},
	getDisplayForValue : function(value, options) {
		var foundOption = _.find(options, function(option){
			return option['value'] == value;
		});
		return foundOption ? foundOption['display'] : "";
	},
	addFinalConfigurationToApprovalItem : function(approvalItem) {
		approvalItem['scope'] = 'private';
		approvalItem['client_id'] = Session.get('selected_client_id');
		approvalItem['created_time'] = timeHandler.convertDateToTimestamp(moment());
		approvalItem['status'] = 'created';
		approvalItem['created_by'] = Meteor.userId();
		return approvalItem;
	},
	setDraftVariableToUpdate : function(newValue, variableID, bucketID, isDelayed) {
		var variablesToUpdate = Session.get('draft_variables_to_update');
		if(!_.has(variablesToUpdate, bucketID)) {
			variablesToUpdate[bucketID] = {};
		}
		if(!_.has(variablesToUpdate[bucketID], 'draft_variables')) {
			variablesToUpdate[bucketID]['draft_variables'] = {};
		}
		
		variablesToUpdate[bucketID]['draft_variables'][variableID] = newValue;
		Session.set('draft_variables_to_update', variablesToUpdate);
		if(isDelayed) {
			this.delayBucketUpdate();
		} else {
			this.updateContentBuckets();
		}
	},
	timeoutHandler : null,
	delayBucketUpdate : function() {
		if(this.timeoutHandler != null) {
			Meteor.clearTimeout(this.timeoutHandler);
		}
		
		this.timeoutHandler = Meteor.setTimeout(function(){
			if(!Session.get('draft_item_updating')) {
				contentBucketHandler.updateContentBuckets();
				this.timeoutHandler = null;
			}
		}, 500);
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
		var isDelayed = true;
		contentBucketHandler.setDraftVariableToUpdate(event.target.value, context['variable_id'], context['content_bucket_id'], isDelayed);
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
			var draftItemsByBucketID = Session.get('draft_items_by_bucket_id');
			value = this.getValueFromArrayWithBucketID(draftItemsByBucketID, variableID, bucketID);
			if(value == null) {
				var contentBucketsByID = Session.get('content_buckets_by_id');
				value = this.getValueFromArrayWithBucketID(contentBucketsByID, variableID, bucketID);
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
			draftVariable['converted'] = contentBucketHandler.bucketHasBeenConverted(contentBucketID);
			draftVariable['bucket_is_required'] = _.has(row, 'required') ? row['required'] : false;
			draftVariable['bucket_repeats'] = _.has(row, 'repeats') ? row['repeats'] : false;
			draftVariable['variable_id'] = variableName;
			return draftVariable;
		});	
		return draftVariables;
	},
};