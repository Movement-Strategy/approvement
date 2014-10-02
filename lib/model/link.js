if(Meteor.isServer) {
	Meteor.methods({
		getLinkData : function(url) {
			return {
				og:description : "Pinball manufacturer Dutch Piball",
			};	
		}
	});
}