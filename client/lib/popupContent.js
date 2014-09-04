popupContent = {
	getContent : function(networkType, contentType, currentContents) {
		var contentDetails = this.contentMap[networkType][contentType];
		return {
			title : this.getContentKey(contentDetails.title, currentContents),
			content : this.getContentKey(contentDetails.content, currentContents),
		};
		
	},
	getContentKey : function(key, currentContents) {
		return _.has(currentContents, key) ? currentContents[key] : key;
	},
	contentMap : {
		facebook : {
			link : {
				title : 'link_body',
				content : 'link_text',
			},
			status : {
				title : "Facebook Status",
				content : 'description',
			},
			photo : {
				title : "Photo Description",
				content : 'description',
			},
		},
		twitter : {
			with_picture : {
				title : 'Tweet',
				content : 'tweet_body',
			},
			without_picture : {
				title : 'Tweet',
				content : 'tweet_body',
			},
		},
		instagram : {
			standard : {
				title : 'Instagram Caption',
				content : 'instagram_caption',
			}
		},
	},
};