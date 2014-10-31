Template['draftBoard'].helpers({
	initializeTextArea : function() {
		Meteor.defer(function(){
			$('textarea.content-input').autosize();
		});
	},
});

Template['draftBoard'].events({
});

