contentBucketHandler = {
	getDraftVariableMap : function() {
		return {
			description : {
				display : "Content Bucket",
				cell_template : 'draftBoardCell',
				get_value : function(draftItemID, bucketID) {
					return Session.get('content_buckets_by_id')[bucketID]['description'];
				},
			},
			content : {
				display : "Content",
				cell_template : 'textAreaCell',
				add_to_approval_item : function(item, draftValue, bucket) {
					var contentType = bucket['draft_variables']['content_type']['value'];
					var networkType = bucket['draft_variables']['network']['value'];
					var inputName = inputBuilder.getInputNameForContentBucket(networkType, contentType);
					item['contents'] = {};
					item['contents'][inputName] = draftValue;
					return item;
				},
			},
			network : {
				display : "Network",
				cell_template : "networkTypeDropdownCell",
				add_to_approval_item : function(item, draftValue) {
					item['type'] = draftValue;
					return item;
				},
				params : {
					style_class : 'draft-network-dropdown',
					default_value : 'Select',
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
			},
			content_type : {
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
			},
			reference : {
				display : "Reference",
				cell_template : 'textAreaCell',
			},
			day_of_week : {
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
			},
		};	
	},
	autoRunHandler : null,
	handleContentBuckets : function() {
		if(this.autoRunHandler != null) {
			this.autoRunHandler.stop();
		} else {
			this.autoRunHandler = Tracker.autorun(function(){
				contentBucketHandler.initializeContentBuckets();
			});
		}	
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
	initializeContentBuckets : function() {
		var query = this.getContentBucketQuery();
		var contentBuckets = ContentBucket.find(query).fetch();
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
	convertAllContentBucketsIntoApprovalItems : function() {
		var contentBucketsByID = Session.get('content_buckets_by_id');
		_.map(contentBucketsByID, function(bucket, bucketID){
			var approvalItem = contentBucketHandler.convertBucketIntoApprovalItem(bucket);
			Meteor.call('insertApprovalItem', approvalItem);
		});
	},
	convertBucketIntoApprovalItem : function(bucket) {
		var approvalItem = {};
		_.map(bucket['draft_variables'], function(draftVariable, variableID){
			var draftValue = draftVariable['value'];
			approvalItem = contentBucketHandler.addDraftVariableToApprovalItem(approvalItem, draftValue, variableID, bucket);
		});
		
		approvalItem = this.addFinalConfigurationToApprovalItem(approvalItem);
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
	addDraftVariableToApprovalItem : function(approvalItem, draftVariable, variableID, bucket) {
		var variableMap = this.getDraftVariableMap();
		if(_.has(variableMap[variableID], 'add_to_approval_item')) {
			approvalItem = variableMap[variableID]['add_to_approval_item'](approvalItem, draftVariable, bucket);
		}
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
	},
	updateContentBuckets : function() {
		var variablesToUpdate = Session.get('draft_variables_to_update');
		_.map(variablesToUpdate, function(bucket, bucketID){
			var draftItemID = contentBucketHandler.getDraftItemIDForContentBucket(bucketID);
			if(draftItemID == null) {
				draftItemHandler.updateDraftItem(bucket, draftItemID, bucketID);
			} else {
				draftItemHandler.insertDraftItem(bucket, draftItemID, bucketID);
			}
		});
	},
	onDropdownChange : function(value, text, element) {
		var context = UI.getData(element);
		this.setDraftVariableToUpdate(value, context['variable_id'], context['content_bucket_id']);
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
		return _.map(Session.get('content_buckets_by_id'), function(bucket, bucketID){
			var draftItemID = contentBucketHandler.getDraftItemIDForContentBucket(bucketID);
			var draftVariables = contentBucketHandler.getDraftVariablesForBucket(bucketID, draftItemID);
			bucket['draft_variables'] = draftVariables;
			bucket['content_bucket_id'] = bucketID;
			bucket['draft_item_id'] = draftItemID;
			return bucket;
		});
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
		return value;
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