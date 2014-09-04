var buildComment = function(commentText) {
	var timestamp = new Date().getTime();
	return {
		text : commentText,
		created_time : timestamp,
		name : Session.get('user_name'),
		avatar : Session.get('user_picture'),
	};
};

Template['approvalItemComments'].helpers({
	comments : function() {
		return Session.get('current_comments');
	},
	formatted_date : function() {
		return moment(this.created_time).format('MMMM Do YYYY, h:mm a');
	},
	user_name : function() {
		return Session.get('user_name');
	},
	user_picture : function() {
		return Session.get('user_picture');
	}
});

Template['approvalItemComments'].events({
	'keydown' : function(event) {
		if($(".comment-input").is(":focus") && event.which == 13) {
			var commentText = $(".comment-input").val();
			var comment = buildComment(commentText);
			Meteor.call('addComment', Session.get('current_item_id'), comment);
			$(".comment-input").val("");
			Meteor.defer(function(){
				Session.set('details_can_close', true);
			});
		}
	},
	'focus' : function(event) {
		Session.set('details_can_close', false);
	},
	'blur' : function() {
		Session.set('details_can_close', true);
	}
});

