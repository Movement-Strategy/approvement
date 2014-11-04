Template['contentTypeDropdownCell'].helpers({
	dropdown_options : function() {
		var networkType = contentBucketHandler.getDraftVariableValue('network', this.content_bucket_id);
		Meteor.defer(function(){
			$('.inline-dropdown').dropdown({onChange : function(value, text){
				contentBucketHandler.onDropdownChange(value, text, this);
			}});
		});
		return contentTypeBuilder.getContentTypes(networkType);
	},
	text_display : function() {
		var networkType = contentBucketHandler.getDraftVariableValue('network', this.content_bucket_id);
		var contentTypes = contentTypeBuilder.getContentTypes(networkType);
		var that = this;
		var contentType = _.find(contentTypes, function(contentType){
			return contentType['value'] == that.value;
		});
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
	style_class : function() {
		return this.params.style_class;
	},
});

Template['contentTypeDropdownCell'].events({
});

