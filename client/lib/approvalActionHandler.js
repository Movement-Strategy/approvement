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
			'unapprove',
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
	unapprove : {
		color : 'red',
		display : 'Unapprove',
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
		var userType = Session.get('user_type');
		var currentScope = Session.get('current_scope');
		var	actions = actionMap[userType][currentScope];
		var actions = this.handleCreativeDirectorActions(userType, currentScope, actions);
		var buttons = _.map(actions, function(action){
			var button = buttonMap[action];
			button['action_id'] = action;
			return button;
		});
		
		return buttons;
	},
	handleCreativeDirectorActions : function(userType, currentScope, actions) {
		
		// handle an edge case when a creative director needs to unapprove content
		if(userType == 'creative_director' && Session.get('current_status') == 'approved' && clientHandler.selectedClientIsInHouse() && currentScope == 'internal') {
			actions = [
				'delete',
				'unapprove',
				'update',
			];
		} 
		return actions;
	}
};