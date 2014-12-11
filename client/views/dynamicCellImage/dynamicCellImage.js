/*
Template['dynamicCellImage'].rendered = function() {
	var selector = '#image_input_' + this.data.content_bucket_id;
	var changeHandler = 'change ' + selector;
	var clickHandler = 'click ' + selector;
	var events = {};
	
	events[changeHandler] = function(event) {
		console.log('change');
		
	};
	
	events['keydown'] = function() {
		console.log('keydown');	
	};
	
		console.log(this);
	Template.dynamicCellImage.events(events);
};
*/


Template['dynamicCellImage'].helpers({
	'bucket_id' : function() {
		return this.content_bucket_id;
	},
});

Template['dynamicCellImage'].events({
	'change .draft-file-bag' : function(event) {
		imageUploadHandler.onDraftFileChange(event, this);
	},
});




