pendingItemHandler = {
	userTypeMap : {
		creative_director : {
			pending_conditions : {
				internal : [
					'submitted',
					'noted',
				],
				external : [
					'submitted',
				],
			},
			relevant_scopes : [
				'external',
				'internal',
			],
		},
	},
	setCountsForProgressBar : function() {
		this.setPendingItemCount();
		this.setRelevantItemCount();
	},
	setPendingItemCount : function() {
		var query = this.getPendingItemQuery();
		var count = ApprovalItem.find(query).count();
		Session.set('total_pending_items', count);
	},
	setRelevantItemCount : function() {
		var query = this.getRelevantItemQuery();
		var count = ApprovalItem.find(query).count();
		Session.set('total_relevant_items', count);
	},
	getRelevantItemQuery : function() {
		var query = {};
		var userTypeDetails = this.userTypeMap[Session.get('user_type')];
		query = this.addBaseFields(query);
		query['scope'] = {
			$in : userTypeDetails['relevant_scopes'],
		};
		return query;
	},
	addBaseFields : function(query) {
		var currentTime = new Date().getTime();
		query['client_id'] = Session.get('selected_client_id');
		query['scheduled_time'] = {
			$gt : currentTime,
		};
		return query;
	},
	getPendingItemQuery : function() {
		var userTypeDetails = this.userTypeMap[Session.get('user_type')];
		var subQueries = [];
		_.map(userTypeDetails['pending_conditions'], function(relevantStatuses, scope){
			var subQuery = {};
			subQuery = pendingItemHandler.addBaseFields(subQuery);
			subQuery['scope'] = scope;
			subQuery['status'] = {
				$in : relevantStatuses,
			};
			subQueries.push(subQuery);
		});
		return {
			$or : subQueries,
		};
	}

};