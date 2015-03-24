pendingItemHandler = {
	userTypeMap : {
		creative_director : {
			pending_conditions : {
				internal : [
					'submitted',
					'creative_updated',
				],
				external : [
					'commented',
					'creative_updated',
				],
			},
			relevant_scopes : [
				'external',
				'internal',
			],
		},
		client : {
			pending_conditions : {
				external : [
					'submitted',
					'creative_updated',
				],
			},
			relevant_scopes : [
				'external',
			],
		},
		social_media_manager : {
			pending_conditions : {
				external : [
					'commented',
				],
				internal : [
					'commented',
				],
				private : [
					'commented',
					'created',
					'creative_updated',
				],
			},
			relevant_scopes : [
				'external',
				'internal',
				'private',
			],
		},
		art_director : {
			pending_conditions : {
				private : [
					'creative_needed',
				],
				internal : [
					'creative_needed',
				],
				external : [
					'creative_needed',
				],
			},
			relevant_scopes : [
				'private',
				'external',
				'internal',
			],
		},
	},
	itemIsPending : function(item) {
		this.userTypeMap;
		var userType = Session.get('user_type');
		var relevantScopes = this.userTypeMap[userType]['relevant_scopes'];
		var pendingConditions = _.has(this.userTypeMap[userType]['pending_conditions'], item.scope) ? this.userTypeMap[userType]['pending_conditions'][item.scope] : [];
		var hasRelevantScope = this.isInArray(relevantScopes, item.scope);
		var hasPendingCondition = this.isInArray(pendingConditions, item.status);
		return hasPendingCondition && hasRelevantScope;
	},
	isInArray : function(array, value) {
		return array.indexOf(value) > -1;	
	},
	setPendingItemCount : function() {
		var query = this.getPendingItemQuery();
		var pendingItems = ApprovalItem.find(query, {sort : {scheduled_time : 1, created_time : 1}}).fetch();
		Session.set('total_pending_items', pendingItems.length);
		Session.set('pending_items', pendingItems);
	},
	setRelevantItemCount : function() {
		var query = this.getRelevantItemQuery();
		var count = ApprovalItem.find(query).count();
		Session.set('total_relevant_items', count);
	},
	goToPendingItem : function(itemOffset) {
		var pendingItems = Session.get('pending_items');	
		if(pendingItems.length > 0) {
			var pendingItem = pendingItems[itemOffset];
			var targetTime = pendingItem['scheduled_time'];
			var weekID = timeHandler.timestampToStartOfWeekDateString(targetTime);
			approvalItemBuilder.editItem(pendingItem['_id'], pendingItem['client_id'], weekID);
		}
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
		var momentDate = new moment();
		var searchTime = momentDate.subtract(1, 'days').format('X') * 1000;
		query['client_id'] = Session.get('selected_client_id');
		query['scheduled_time'] = {
			$gt : searchTime,
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