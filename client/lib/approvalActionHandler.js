actionMap = {
	social_media_manager : {
		internal : [
			'delete',
			'update',
		],
		external : [
			'delete',
			'needs_creative',
			'update',
		],
		private : [
			'delete',
			'needs_creative',
			'finalize',
			'edit',
		],
	},
	client : {
		external : [
			'comment',
			'needs_creative',
			'reject',
			'approve',
			'update',
		],
	},
	art_director : {
		internal : [
			'update_creative',
		],
		external : [
			'update_creative',
		],
		private : [
			'update_creative',
		],
	},
	creative_director : {
		internal : [
			'delete',
			'comment',
			'needs_creative',
			'reject',
			'approve',
			'update',
		],
		external : [
			'delete',
			'update',
		],
	},
};

buttonMap = {
	delete : {
		color : 'black',
		display : 'Delete',
	},
	comment : {
		color : 'orange',
		display : 'Note',
	},
	back : {
		color : 'grey',
		display : 'Back',
	},
	update : {
		color : 'blue',
		display : 'Update',
	},
	reject : {
		color : 'red',
		display : 'Reject',
	},
	approve : {
		color : 'green',
		display : 'Approve',
	},
	update_creative : {
		color : 'blue',
		display : 'Update Creative',
	},
	edit : {
		color : 'blue',
		display : 'Update',
	},
	finalize : {
		color : 'green',
		display : 'Finalize',
	},
	needs_creative : {
		color : 'purple',
		display : 'Creative',
	},
};

approvalActionHandler = {
	getActionButtons : function() {
		var	actions = actionMap[Session.get('user_type')][Session.get('current_scope')];
		var buttons = _.map(actions, function(action){
			var button = buttonMap[action];
			button['action_id'] = action;
			return button;
		});
		return buttons;
	}
};