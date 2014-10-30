Template['draftBoard'].helpers({
	initializeDropdown : function() {
		Meteor.defer(function(){
			$('.network-type-inline').dropdown();
		});
	},
	draft_columns : function() {
		return draftBoardHandler.getColumns();
	},
	initializeTextArea : function() {
		Meteor.defer(function(){
			$('textarea.content-input').autosize();
		});
	},
});

Template['draftBoard'].events({
});

