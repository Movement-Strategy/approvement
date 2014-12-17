contentTypeBuilder = {
	getContentTypes : function(networkType) {
		contentTypes = [];
		var networkType = networkType;
		if(networkType != null) {
			contentTypes = contentTypeBuilder.networkTypeMap[networkType];
		}
		return contentTypes;
	},
	isContentTypeChosen : function() {
		return Session.get('current_content_type') != null;
	},
	initializeDropdown : function() {
		Meteor.defer(function(){
			$('.content-type-dropdown').dropdown();
		});
	},
	onClickCellDropdownOption : function(event) {
		
		var context = UI.getData($(event.currentTarget).parent().parent()[0]);
		var network = contentBucketHandler.getValueForDraftVariable('network', context.draft_item_id, context.content_bucket_id);
		var value = $(event.currentTarget).attr('data-value');
		if(network == 'facebook' && value == 'link') {
			contentBucketHandler.setDraftVariableToUpdate('unset', 'image', context.content_bucket_id);
		}
		var selector = '.content-type-dropdown-cell.' + context.content_bucket_id;
		contentBucketHandler.setDraftVariableToUpdate(value, context.variable_id, context.content_bucket_id);
		$(selector).dropdown('hide').dropdown('set text', $(event.currentTarget).text());		
	},
	getCellDropdownOptions : function(context) {
		var networkType = contentBucketHandler.getValueForDraftVariable('network',context.draft_item_id, context.content_bucket_id);
		var bucket = context;
		var types = contentTypeBuilder.getContentTypes(networkType);
		return _.map(types, function(type){
			type['bucket'] = bucket;
			return type;
		});
	},
	isType : function(type) {
		return Session.equals('current_content_type', type);
	},
	initializeCellDropdown : function(context) {
		
		var contentType = contentBucketHandler.getValueForDraftVariable('content_type', context.draft_item_id, context.content_bucket_id);
		var selector = '.content-type-dropdown-cell.' + context.content_bucket_id;
		Meteor.defer(function(){
			if(contentType != null) {
				$(selector).dropdown('set selected', contentType);
			} else {
				$(selector).dropdown('restore default text');
			}
		});
	},
	hasOnlyOneContentType : function() {
		if(Session.get('current_network_type') != null) {
			var contentTypes = this.networkTypeMap[Session.get('current_network_type')];
			return contentTypes.length == 1;
		} else {
			return false;
		}
	},
	onClickContentType : function(event) {
		Session.set('current_content_type', $(event.currentTarget).attr('data-value'));
		inputBuilder.initializeClickableInputs();
	},
	networkTypeMap : {
		facebook : [
			{
				display : "Link",
				value : "link",
			},
			{
				display : "Photo",
				value : "photo",
			},
			{
				display : "Status",
				value : "status",
			},
		],
		twitter : [
			{
				display : "Standard",
				value : 'without_picture',
			},
			{
				display : "With Twit-pic",
				value : 'with_picture',
			},
			{
				display : "With Twit-pic, no text",
				value : 'with_picture_no_text',
			},
		],
		instagram : [
			{
				display : "Standard",
				value : 'standard',
			}
		],
		linked : [
			{
				display : "Picture With Description",
				value : 'picture_with_description',
			},
			{
				display : "Picture Without Description",
				value : 'picture_without_description',
			},
			{
				display : "Text Only",
				value : 'without_picture',
			}
		],
	},
};