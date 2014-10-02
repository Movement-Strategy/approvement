if(Meteor.isServer) {
	Meteor.methods({
		getLinkData : function(url) {
			return {
				"og:description" : "Pinball manufacturer Dutch Pinball finally showed prototypes of their Big Lebowski-themed machine, a long awaited table among pinball enthusiasts, and it's full of awesome features.",
				"og:image" : "http://i.kinja-img.com/gawker-media/image/upload/s--nX6BS8La--/kmpegdzse9juzaqkvyiv.jpg",
				"og:title" : "The Big Lebowski Pinball Table Has Everything A Dude Needs",
			};	
		}
	});
}