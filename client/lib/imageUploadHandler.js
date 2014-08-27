imageUploadHandler = {
	heightMap : {
		facebook : {
			width : '476',
			height : '246',
		},
		twitter : {
			width : '364',
			height : '506',
		}
	},
	getImageURL : function() {
		var heightDetails = this.heightMap[Session.get('current_network_type')];
		var sampleURL = 'http://lorempixel.com/' + heightDetails['width'] + '/' + heightDetails['height'] + '/';
		currentItemContents = Session.get('current_item_contents');
		currentURL = _.has(currentItemContents, 'image_url') ? currentItemContents['image_url'] : sampleURL;
		return Session.get('uploaded_image_url') == null ? currentURL : Session.get('uploaded_image_url');
	}
};