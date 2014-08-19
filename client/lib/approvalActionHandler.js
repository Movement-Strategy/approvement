actionMap = {
	social_media_manager : {
		internal : [
			'update',
		],
		external : [
			'update',
		],
	},
	client : {
		external : [
			'comment',
			'reject',
			'approve',
			'update',
		],
	},
	creative_director : {
		internal : [
			'comment',
			'reject',
			'approve',
			'update',
		],
		external : [
			'update',
		],
	},
};

buttonMap = {
	comment : {
		color : 'orange',
		display : 'Note',
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