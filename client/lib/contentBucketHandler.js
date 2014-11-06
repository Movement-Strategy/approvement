contentBucketHandler = {
	getDraftVariableMap : function() {
		return {
			description : {
				display : "Content Bucket",
				cell_template : 'draftBoardCell',
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
	initializeContentBuckets : function() {
		
		var contentBuckets = ContentBucket.find().fetch();
		var contentBucketsByID = {};
		_.map(contentBuckets, function(bucket){
			contentBucketsByID = contentBucketHandler.setContentBucketByID(bucket, contentBucketsByID, contentBuckets);
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
	updateContentBuckets : function() {
		var variablesToUpdate = Session.get('draft_variables_to_update');
		_.map(variablesToUpdate, function(variablesForBucket, bucketID){
			var query = {
				$set : {},
			};
			_.map(variablesForBucket, function(value, key){
				if(value == 'unset') {
					value = null;
				}
				var setKey = 'draft_variables.' + key;
				query['$set'][setKey] = value; 
			});
			
			Meteor.call('updateContentBucket', bucketID, query);
		});
	},
	setDraftVariableToUpdate : function(newValue, variableID, bucketID) {
		var variablesToUpdate = Session.get('draft_variables_to_update');
		if(!_.has(variablesToUpdate, bucketID)) {
			variablesToUpdate[bucketID] = {};
		}
		variablesToUpdate[bucketID][variableID] = newValue;
		Session.set('draft_variables_to_update', variablesToUpdate);
	},
	setContentBucketByID : function(bucket, contentBucketsByID, contentBuckets) {
		
		draftVariables = _.has(bucket, 'draft_variables') ? bucket['draft_variables'] : {};
		
		// mix in any required details from draft variable map
		_.map(contentBucketHandler.getDraftVariableMap(), function(variableDetails, variableName){
			draftVariables = contentBucketHandler.configureDraftVariable(variableDetails, variableName, draftVariables);
		});
		
		bucket['draft_variables'] = draftVariables;
		contentBucketsByID[bucket['_id']] = bucket;
		return contentBucketsByID;
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
	getContentBuckets : function() {
		var contentBucketsByID = Session.get('content_buckets_by_id');
		return _.values(contentBucketsByID);
	},
	getDraftVariablesForRow : function(row) {
		var contentBucketID = row['_id'];
		return _.map(contentBucketHandler.getDraftVariableMap(), function(variable, variableName){
			var draftVariable = row.draft_variables[variableName];
			draftVariable['content_bucket_id'] = contentBucketID;
			draftVariable['variable_id'] = variableName;
			return draftVariable;
		});
	},	
};