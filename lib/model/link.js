if(Meteor.isServer) {
	Meteor.methods({
		getLinkResponse : function(url) {
			this.unblock();
			var response = Meteor.http.call("GET", url);
			return response;
		}
	});
}