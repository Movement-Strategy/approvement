Template['draftBoardFooter'].helpers({
});

Template['draftBoardFooter'].events({
	'click .convert.button' : function() {
		
	},
	'click .save.button' : function() {
		contentBucketHandler.updateContentBuckets();	
	},
});

