popupContent = {
	getContent : function(networkType, contentType, currentContents) {
		var contentDetails = this.contentMap[networkType][contentType];
		var output = {
			title :  this.getContentKey(contentDetails.title, currentContents),
			content : this.getContentKey(contentDetails.content, currentContents),
		};
		
		if(_.has(currentContents, 'image_url') && currentContents.image_url != '') {
			output.content = output.content + '<img class="ui small popup-image image" src="' + currentContents.image_url + '">';
		}
		
		return output;
		
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
		linked : {
			with_picture : {
				title : 'Content Title',
				content : 'linked_content_title',
			},
			without_picture : {
				title : 'linked_content_title',
				content : 'linked_description',
			}
		},
	},
};