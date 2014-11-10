Template['dropdownCell'].helpers({
	initializeDropdown : function() {
		var selector = '.' + this.params.style_class;
		var draftValue = contentBucketHandler.getValueForDraftVariable(this.variable_id, this.draft_item_id, this.content_bucket_id);
		Meteor.defer(function(){
			if(draftValue != null) {
				$(selector).dropdown('set selected', draftValue).dropdown('setting', {onChange : function(value, text){
					contentBucketHandler.onDropdownChange(value, text, this);
				}});
			} else {
				$(selector).dropdown({onChange : function(value, text){
					contentBucketHandler.onDropdownChange(value, text, this);
				}});
			}
		});
	},
	default_text : function() {
		return this.params.default_value;	
	},
	dropdown_options : function() {
		return this.params.dropdown_options;
	},
	style_class : function() {
		return this.params.style_class;
	},
});

Template['dropdownCell'].events({
});

