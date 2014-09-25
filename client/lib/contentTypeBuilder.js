contentTypeBuilder = {
	getContentTypes : function() {
		contentTypes = [];
		var networkType = Session.get('current_network_type');
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
	isType : function(type) {
		return Session.equals('current_content_type', type);
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