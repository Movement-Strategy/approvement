var buildComment = function(commentText) {
	var timestamp = new Date().getTime();
	return {
		text : commentText,
		created_time : timestamp,
		name : "Clay Branch",
		avatar : '/images/fb_icon.png',
	};
	
};

Template['approvalItemComments'].helpers({
	comments : function() {
		return Session.get('current_comments');
	}
});

Template['approvalItemComments'].events({
	'keydown' : function(event) {
		if($(".comment-input").is(":focus") && event.which == 13) {
			var commentText = $(".comment-input").val();
			var comment = buildComment(commentText);
			Meteor.call('addComment', Session.get('current_item_id'), comment);
			$(".comment-input").val("");
		}
	},
});

