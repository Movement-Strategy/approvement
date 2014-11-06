Template['editContentBucketModal'].helpers({
	initializeToggle : function() {
		Meteor.defer(function(){
			$('.ui.checkbox').checkbox();
		});
	}
});

Template['editContentBucketModal'].events({
});

