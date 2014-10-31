contentBucketHandler = {
	getDraftVariableMap : function() {
		return {
			description : {
				display : "Content Bucket",
				cell_template : 'draftBoardCell',
			},
			network : {
				display : "Network",
				cell_template : "dropdownCell",
				params : {
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
					/* network : 'instagram', */
				},
			},
		];
		
		var contentBucketsByID = {};
		_.map(contentBuckets, function(bucket){
			contentBucketsByID = contentBucketHandler.setContentBucketByID(bucket, contentBucketsByID, contentBuckets);
		});
		
		Session.set('content_buckets_by_id', contentBucketsByID);
		
	},
	updateContentBucket : function() {
		var contentBucketsByID = Session.get('content_buckets_by_id');
		contentBucketsByID['_1']['draft_variables']['network']['value'] = 'instagram';
		Session.set('content_buckets_by_id', contentBucketsByID);
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
	
};