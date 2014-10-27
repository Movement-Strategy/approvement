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
			contents : 'set',
		},
		client : {
			status : 'commented',
			contents : 'set',
		},
	},
	edited : {
		social_media_manager : {
			contents : 'set',
		}
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
			contents : 'set',
		},
		client : {
			status : 'approved',
			contents : 'set',
		},
	},
	finalized : {
		social_media_manager : {
			status : 'submitted',
			scope : 'internal',
			contents : 'set',
		},
	},
};

stateManager = {
	changeToState : function(newState) {
		var stateDetails = stateMap[newState];
		var userTypeDetails = stateDetails[Session.get('user_type')];
		detailsHandler.handleUpdate(userTypeDetails);
	},
};