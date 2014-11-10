draftItemHandler = {
	autoRunHandler : null,
	handleDraftItems : function() {
		if(this.autoRunHandler != null) {
			this.autoRunHandler.stop();
		} else {
			this.autoRunHandler = Tracker.autorun(function(){
				draftItemHandler.initializeDraftItems();
			});
		}	
	},
	initializeDraftItems : function() {
		var query = this.getDraftItemQuery();
		var draftItems = DraftItem.find(query).fetch();
		var draftItemsByBucketID = {};
		_.map(draftItems, function(item){
			draftItemsByBucketID[item['content_bucket_id']] = item;
		});
		Session.set('draft_items_by_bucket_id', draftItemsByBucketID);
	},
	updateDraftItemForContentBucket : function(bucket, bucketID) {
		var draftItemID = contentBucketHandler.getDraftItemIDForContentBucket(bucketID);
		if(draftItemID == null) {
			draftItemHandler.insertDraftItem(bucket, draftItemID, bucketID);
		} else {
			draftItemHandler.updateDraftItem(bucket, draftItemID, bucketID);
		}
	},
	updateDraftItem : function(bucket, draftItemID, bucketID) {
		if(_.has(bucket, 'draft_variables')) {
			var variablesForBucket = bucket['draft_variables'];
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
			Meteor.call('updateDraftItem', draftItemID, bucketID, query);
		}
	},
	insertDraftItem : function(bucket, draftItemID, bucketID) {
		var draftItem = {};
		draftVariables = _.has(bucket, 'draft_variables') ? bucket['draft_variables'] : {};
		draftVariables = draftItemHandler.handleUnsetOnCreate(draftVariables);
		draftItem['draft_variables'] = draftVariables;
		draftItem['content_bucket_id'] = bucketID;
		draftItem['week'] = timeHandler.timestampToDateString(timeHandler.getTimestampForCurrentDate()),
		draftItem['client_id'] = Session.get('selected_client_id');
		draftItem['created_by'] = Meteor.userId();
		Meteor.call('insertDraftItem', draftItem);
	},
	handleUnsetOnCreate : function(draftVariables) {
		var updatedVariables = {};
		_.map(draftVariables, function(value, key){
			if(value != 'unset') {
				updatedVariables[key] = value;
			}
		});
		return updatedVariables;	
	},
	getDraftItemQuery : function() {
		return {
			week : timeHandler.timestampToDateString(timeHandler.getTimestampForCurrentDate()),
			client_id : Session.get('selected_client_id'),
		};
	},
};