popupContent = {
	getContent : function(networkType, contentType, currentContents) {
		var contentDetails = this.contentMap[networkType][contentType];
		var output = {
			title :  this.getContentKey(contentDetails.title, currentContents),
			content : this.getContentKey(contentDetails.content, currentContents),
		};
		
		if(_.has(currentContents, 'image_url') && currentContents.image_url != '') {
			output.content = output.content + '<div class="popup-image-container"><img class="ui small popup-image image" src="' + currentContents.image_url + '"></div>';
		}
		
		return output;
		
	},
	onMouseEnter : function(event) {
		if(!this.popupsDisabled()) {
			this.setShownPopupID(event);	
		}
	},
	handlePopup : function(selector, params) {
		Meteor.defer(function(){
			$(selector).popup(params);
		});
	},	
	disablePopups : function() {
		Session.set('popups_disabled', true);
		Session.set('shown_popup_id', null);
	},
	popupsDisabled : function() {
		return Session.get('popups_disabled');
	},
	setShownPopupID : function(event) {
		Session.set('shown_popup_id', event.currentTarget.id);
	},
	initializePopup : function(context) {
		if(!this.popupsDisabled()) {
			Meteor.defer(function(){
				$('#label_' + context._id).popup({
					position : 'top center',
				});
			});
		} else {
			Meteor.defer(function(){
				$('#label_' + context._id).popup('destroy');
			});
		}
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
			picture_with_description : {
				title : 'linked_content_title',
				content : 'linked_body',
			},
			picture_without_description : {
				title : 'linked_content_title',
				content : 'linked_body',
			},
			without_picture : {
				title : 'LinkedIn Post',
				content : 'linked_description',
			}
		},
	},
};