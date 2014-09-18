networkTypeBuilder = {
	getTypeName : function() {
		return this.typeMap[Session.get('current_network_type')];
	},
	typeMap : {
		facebook : 'facebook post',
		twitter : 'tweet',
		instagram : 'instagram post',
		linked : 'linkedin post',
	},
};