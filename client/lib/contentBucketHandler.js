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
			},
			network : {
				display : "Network",
				cell_template : "dropdownCell",
				get_value_type : 'dropdown',
				params : {
					style_class : 'draft-network-dropdown',
					default_value : 'Select',
					dropdown_options : [
						{
							value : 'facebook',
							display : 'Facebook',
						},
						{
							value : 'instagram',
							display : 'Instagram',
						},
					],
				},
			},
			content_type : {
				display : "Content Type",
				cell_template : "dropdownCell",
				params : {
					style_class : 'draft-content-dropdown',
					default_value : 'Select',
					dropdown_options : [
						{
							value : 'with_photo',
							display : 'Photo',
						},
						{
							value : 'without_photo',
							display : 'Without Photo',
						},
					],
				},
			},
			reference : {
				display : "Reference",
				cell_template : 'textAreaCell',
			},
/*
			content : {
				display : "Content",
			},
*/
/*
			network : {
				display : "Network"
			},
*/
/*
			content_type : {
				display : "Content Type"
			},
			day_of_week : {
				display : "Day of week"
			},
			scheduled_time : {
				display : "Scheduled Time"
			},
			reference : {
				display : "Reference"
			},
*/
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
	updateContentBuckets : function() {
		var variablesToUpdate = Session.get('draft_variables_to_update');
		_.map(variablesToUpdate, function(variablesForBucket, bucketID){
			var query = {
				$set : {},
			};
			_.map(variablesForBucket, function(value, key){
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