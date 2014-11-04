dropdownSet = false;
Template['contentTypeDropdownCell'].helpers({
	reset_dropdowns : function() {
		Session.set('show_network_type_dropdown', true);
		dropdownSet = false;
	},
	show_dropdown : function() {
		return Session.get('show_network_type_dropdown');	
	},
	dropdown_options : function() {
		console.log('firing');
		var networkType = contentBucketHandler.getDraftVariableValue('network', this.content_bucket_id);
		if(dropdownSet) {
			Session.set('show_network_type_dropdown', false);
		} else {
			Meteor.defer(function(){
				$('.switching-dropdown').dropdown({'onChange' : function(value, text){
					contentBucketHandler.onDropdownChange(value, text, this);
					dropdownSet = true;
				}});
			});
		}
		return contentTypeBuilder.getContentTypes(networkType);
	},
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
	style_class : function() {
		return this.params.style_class;
	},
});

Template['contentTypeDropdownCell'].events({
});

