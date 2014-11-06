contentBucketModalHandler = {
	initializeModal : function() {
		Meteor.defer(function(){
			$('.content-bucket-modal').modal('show');
		});
	},
};