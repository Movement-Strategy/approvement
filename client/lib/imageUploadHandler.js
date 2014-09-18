imageUploadHandler = {
	heightMap : {
		facebook : {
			width : '476',
			height : '246',
		},
		twitter : {
			width : '506',
			height : '364',
		},
		instagram : {
			width : '512',
			height : '512',
		},
		linked : {
			width : '320',
			height : '169',
		},
		
	},
	getImageURL : function() {
		var heightDetails = this.heightMap[Session.get('current_network_type')];
		var sampleURL = 'http://lorempixel.com/' + heightDetails['width'] + '/' + heightDetails['height'] + '/';
		currentItemContents = Session.get('current_item_contents');
		currentURL = _.has(currentItemContents, 'image_url') ? currentItemContents['image_url'] : sampleURL;
		return Session.get('uploaded_image_url') == null ? currentURL : Session.get('uploaded_image_url');
	},
	onImageUpload : function(url) {
		Session.set('uploaded_image_url', url);
		var selectorMap = {
			facebook : 'link-image',
			instagram : 'instagram-image-container',
			twitter : 'twitter-image-container',
			linked : 'linked-image-container',
		};
		var selector = selectorMap[Session.get('current_network_type')];
		selector = '.' + selector;
		$(selector).transition('tada');
	}
	
};