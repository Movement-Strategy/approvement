networkTypeBuilder = {
	getTypeName : function() {
		var typeName = this.typeMap[Session.get('current_network_type')];
		return typeName == null ? 'content' : typeName;
	},
	typeMap : {
		facebook : 'facebook post',
		twitter : 'tweet',
		instagram : 'instagram post',
		linked : 'linkedin post',
	},
	initializeDropdown : function() {
		Meteor.defer(function(){
			$('.network-type-dropdown').dropdown();
		});
	},
	handleNetworkWithSingleContentType : function() {
		if(contentTypeBuilder.hasOnlyOneContentType()) {
			var contentTypes = contentTypeBuilder.networkTypeMap[Session.get('current_network_type')];
			Session.set('current_content_type', contentTypes[0].value);
			inputBuilder.initializeClickableInputs();
		}
	},
	onNetworkTypeChange : function(newNetworkType) {
		Session.set('current_network_type', newNetworkType);
		Session.set('current_content_type', null);
		inputBuilder.initializeClickableInputs();
		networkTypeBuilder.handleNetworkWithSingleContentType();
	},
	networkTypeChosen : function() {
		return Session.get('current_network_type') != null;
	}
};