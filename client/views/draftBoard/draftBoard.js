Template['draftBoard'].helpers({
	initializeDropdown : function() {
		Meteor.defer(function(){
			$('.network-type-inline').dropdown();
		});
	},
	initializeTextArea : function() {
		Meteor.defer(function(){
			$('textarea.content-input').autosize();
		});
	},
});

Template['draftBoard'].events({
});

