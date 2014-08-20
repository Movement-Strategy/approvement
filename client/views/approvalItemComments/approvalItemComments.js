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
});

Template['approvalItemComments'].events({
	'keydown' : function() {
		if($(".comment-input").is(":focus") && event.which == 13) {
			var commentText = $(".comment-input").val();
			var comment = buildComment(commentText);
			
		}
	},
});

