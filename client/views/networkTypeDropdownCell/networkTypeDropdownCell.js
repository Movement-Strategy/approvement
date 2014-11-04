Template['networkTypeDropdownCell'].helpers({
	dropdown_options : function() {
		var that = this;
		Meteor.defer(function(){
			$('.network-inline-dropdown').dropdown({'onChange' : function(value, text){
				contentBucketHandler.setDraftVariableToUpdate(null, 'content_type', that.content_bucket_id);
				contentBucketHandler.onDropdownChange(value, text, this);
			}});
		});
		return this.params.dropdown_options;
	},
	value : function() {
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

Template['networkTypeDropdownCell'].events({
});

