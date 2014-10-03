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
			width : '180',
			height : '110',
		},
		
	},
	getImageURL : function() {
		var networkType = Session.get('current_network_type');
		if(networkType) {
			var heightDetails = this.heightMap[networkType];
			var sampleURL = 'http://lorempixel.com/' + heightDetails['width'] + '/' + heightDetails['height'] + '/';
			currentItemContents = Session.get('current_item_contents');
			currentURL = _.has(currentItemContents, 'image_url') ? currentItemContents['image_url'] : sampleURL;
			var linkData = Session.get('current_facebook_link_data');
			var metaTagURL = _.has(linkData , 'og:image') ?  linkData['og:image'] : null;
			if(metaTagURL && Session.get('uploaded_image_url') == null) {
				Session.set('uploaded_image_url', metaTagURL);
			}
			return Session.get('uploaded_image_url') == null ? currentURL : Session.get('uploaded_image_url');
		} else {
			return null;
		}
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