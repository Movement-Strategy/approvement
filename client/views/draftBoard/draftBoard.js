Template['draftBoard'].helpers({
	initializeDropdown : function() {
		Meteor.defer(function(){
			$('.network-type-inline').dropdown();
		});
	},
	content_buckets : function() {
		return contentBucketHandler.getContentBuckets();
	},
	table_headers : function() {
		return draftBoardHandler.getTableHeaders();
	},
	draft_variables : function() {
		return _.values(this.draft_variables);	
	},
	initializeTextArea : function() {
		Meteor.defer(function(){
			$('textarea.content-input').autosize();
		});
	},
});

Template['draftBoard'].events({
});

