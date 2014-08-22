stateMap = {
	rejected : {
		creative_director : {
			status : 'rejected',
		},
		client : {
			status : 'rejected',
		},
	},
	commented : {
		creative_director : {
			status : 'commented',
			
		},
		client : {
			status : 'commented',
		},
	},
	updated : {
		creative_director : {
			contents : 'set',
		},
		client : {
			contents : 'set',
		},
		social_media_manager : {
			status : 'submitted',
			contents : 'set',
		}
	},
	approved : {
		creative_director : {
			status : 'submitted',
			scope : 'external',
		},
		client : {
			status : 'approved',
		},
	},
};

stateManager = {
	updateApprovalItemState : function(details) {
		console.log(details);
		Meteor.call('updateStatus', Session.get('current_item_id'), details);
	},
	changeToState : function(newState, contents) {
		var stateDetails = stateMap[newState];
		var userTypeDetails = stateDetails[Session.get('user_type')];
		if(_.has(userTypeDetails, 'contents')) {
			userTypeDetails['contents'] = contents;
		}
		this.updateApprovalItemState(userTypeDetails);
	},
};