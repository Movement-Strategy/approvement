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
/*
	text_display : function() {
		var networkType = contentBucketHandler.getDraftVariableValue('network', this.content_bucket_id);
		var contentTypes = contentTypeBuilder.getContentTypes(networkType);
		var that = this;
		var contentType = _.find(contentTypes, function(contentType){
			return contentType['value'] == that.value;
		});
		console.log(contentType);
		if(contentType) {
			return contentType['display'];
		} else {
			return 'None';
		}
	},
	output_value : function() {
		if(_.has(this, 'value')) {
			return this.value;
		} else {
			return this.params.default_value;
		}
	},
*/
	style_class : function() {
		return this.params.style_class;
	},
});

Template['contentTypeDropdownCell'].events({
	'click .content-type-item' : function(event) {
		var value = $(event.currentTarget).attr('data-value');
		$('.content-type-dropdown-cell').dropdown('hide');
		console.log(value);
	},
});

