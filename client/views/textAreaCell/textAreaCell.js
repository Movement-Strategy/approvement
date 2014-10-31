Template['textAreaCell'].helpers({
	initializeTextArea : function() {
		Meteor.defer(function(){
			$('textarea.content-input').autosize();
		});
	},
});

Template['textAreaCell'].events({
});

