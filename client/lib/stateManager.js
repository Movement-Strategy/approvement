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
			status : 'created',
		}
	},
	creative_updated : {
		art_director : {
			contents : 'set',
			status : 'creative_updated',
		},
	},
	creative_needed : {
		creative_director : {
			status : 'creative_needed',
		},
		social_media_manager : {
			status : 'creative_needed',
		},
		client : {
			status : 'creative_needed',
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
	unapproved : {
		creative_director : {
			status : 'submitted',
			scope : 'internal',
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