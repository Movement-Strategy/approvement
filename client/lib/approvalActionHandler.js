actionMap = {
	social_media_manager : {
		internal : [
			'back',
			'update',
		],
		external : [
			'back',
			'update',
		],
	},
	client : {
		external : [
			'back',
			'comment',
			'reject',
			'approve',
			'update',
		],
	},
	creative_director : {
		internal : [
			'back',
			'comment',
			'reject',
			'approve',
			'update',
		],
		external : [
			'back',
			'update',
		],
	},
};

buttonMap = {
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