commentHandler = {
	setCommentsFromDayContext : function(context) {
		var comments = _.has(context, 'comments') ? context.comments : [];
		if(context._id == Session.get('current_item_id')) {
			Session.set('current_comments', comments);
		}
	}
};