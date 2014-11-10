dropdownSet = false;
Template['contentTypeDropdownCell'].helpers({
	dropdown_options : function() {
		var networkType = contentBucketHandler.getValueForDraftVariable('network',this.draft_item_id, this.content_bucket_id);
		var bucket = this;
		var types = contentTypeBuilder.getContentTypes(networkType);
		return _.map(types, function(type){
			type['bucket'] = bucket;
			return type;
		});
	},
	initializeDropdown : function() {
		var contentType = contentBucketHandler.getDraftVariableValue('content_type', this.bucket.draft_item_id, this.bucket.content_bucket_id);
		Meteor.defer(function(){
			if(contentType != null) {
				$('.content-type-dropdown-cell').dropdown('set selected', contentType);
			} else {
				$('.content-type-dropdown-cell').dropdown('restore default text');
			}
		});
	},
	style_class : function() {
		return this.params.style_class;
	},
});

Template['contentTypeDropdownCell'].events({
	'click .content-type-item' : function(event) {
		var context = UI.getData($(event.currentTarget).parent().parent()[0]);
		var value = $(event.currentTarget).attr('data-value');
		contentBucketHandler.setDraftVariableToUpdate(value, context.variable_id, context.content_bucket_id);
		$('.content-type-dropdown-cell').dropdown('hide').dropdown('set text', $(event.currentTarget).text());		
	},
});


