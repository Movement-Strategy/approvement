contentBucketHandler = {
	valueMap : {
		dropdown : function(variableDetails) {
			var styleClass = '.' + variableDetails['params']['style_class'];
			console.log($(styleClass).dropdown().data());
		},
	},
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
		var contentBuckets = [
			{
				_id : '_1',
				draft_variables : {
					description : "Throwback Thursday",
					network : 'instagram',
					content_type : 'without_photo',
					content : "Test this is some content",
				},
			},
		];
		
		var contentBucketsByID = {};
		_.map(contentBuckets, function(bucket){
			contentBucketsByID = contentBucketHandler.setContentBucketByID(bucket, contentBucketsByID, contentBuckets);
		});
		
		Session.set('content_buckets_by_id', contentBucketsByID);
		
	},
	updateContentBuckets : function() {
		var newContentBucketsByID = {};
		_.map(Session.get('content_buckets_by_id'), function(bucket, id){
			_.map(bucket['draft_variables'], function(variableDetails, variableName){
				
				if(_.has(variableDetails, 'get_value_type')) {
					var valueType = variableDetails['get_value_type'];
					var valueFunction = contentBucketHandler.valueMap[valueType];
					var value = valueFunction(variableDetails);
				}
			});
		});
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
		console.log(row);
		return _.map(contentBucketHandler.getDraftVariableMap(), function(variable, variableName){
			return row.draft_variables[variableName];
		});
	},
	
};