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
			
		},
		client : {
			
		},
		social_media_manager : {
			status : 'submitted',
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
	changeToState : function(newState) {
		var stateDetails = stateMap[newState];
		var userTypeDetails = stateDetails[Session.get('user_type')];
		this.updateApprovalItemState(userTypeDetails);
	},
};