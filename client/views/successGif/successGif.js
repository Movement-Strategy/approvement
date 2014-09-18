Template['successGif'].helpers({
	gif_url : function() {
		var gifs = [
			'gif1.gif',
			'gif2.gif',
			'gif3.gif',
			'topgun.gif',
			'elvis.gif',
			'fistpump.gif',
			'never.gif',
			'wow.gif',
			'dog-five.gif',
			'kingpin.gif',
			'yes.gif',
			'slowclap.gif',
		];
		
		var gif = gifs[Math.floor(Math.random() * gifs.length)];
		return 'images/' + gif;
	},
});

Template['successGif'].events({
});

