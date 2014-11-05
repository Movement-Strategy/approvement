dropdownSet = false;
Template['contentTypeDropdownCell'].helpers({
	dropdown_options : function() {
		var networkType = contentBucketHandler.getDraftVariableValue('network', this.content_bucket_id);
		return contentTypeBuilder.getContentTypes(networkType);
	},
	initializeDropdown : function() {
		Meteor.defer(function(){
			$('.content-type-dropdown-cell').dropdown('restore default text');
		});
	},
	style_class : function() {
		return this.params.style_class;
	},
});

Template['contentTypeDropdownCell'].events({
	'click .content-type-item' : function(event) {
		var value = $(event.currentTarget).attr('data-value');
		$('.content-type-dropdown-cell').dropdown('hide').dropdown('set text', $(event.currentTarget).text());		
		console.log(value);
	},
});

