
statusColorMap = {
	approved : 'green',
	rejected : 'red',
	submitted : 'grey',
	commented : 'orange',
};

iconMap = {
	facebook : 'facebook',
	twitter : 'twitter',
	instagram : 'instagram',
	linked : 'linkedin',
};


Template['calendarDay'].helpers({
	updateReactiveVariables : function() {
		var comments = _.has(this, 'comments') ? this.comments : [];
		if(this._id == Session.get('current_item_id')) {
			Session.set('current_comments', comments);
		}
	},
	is_not_client : function() {
		return Session.get('user_type') != 'client';
	},
	day : function() {
		if(Session.get('reset_items')) {
			return {};
		} else {
			return this.day;
		}
		
	},
});

Template['calendarDay'].events({
	'click .create-item-button' : function(event) {
		prepareModalToShow(this, true);
	},
});

