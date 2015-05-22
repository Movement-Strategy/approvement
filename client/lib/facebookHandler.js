facebookHandler = {
	getProfilePictureURL : function(allowCustomization) {
		var profileName = Session.get('selected_client').facebook_profile_name;
		
		if(allowCustomization){
			var customProfileName = customClientHandler.getCustomProfileImage();
			if(customProfileName != null) {
				profileName = customProfileName;
			}
		}
		return this.getPictureURL(profileName);
	},
	getPictureURL : function(id) {	
		if (/^(f|ht)tps?:\/\//i.test(id)) {
			// if the id matches a link structure, we know it's already a link and return it
			return id;
		} else {
			// if its not a valid link, assume its a profile id and buidl the full url
			return 'http://graph.facebook.com/' + id + '/picture?size=square';
		}
	},
	showLinkInput : function() {
		var showLink = this.isLegacyLink() ? false : contentTypeBuilder.isType('link') && !userHandler.userIsType('client');
		if(customClientHandler.customDropdownsAreRequired()) {
			valueSelected = customClientHandler.allCustomDropdownValuesSelected();
			var showLink = valueSelected && showLink;
		}
		return showLink;
	},
	editingLink : function() {
		if(this.getFacebookLink() == null) {
			this.focusOnNewLink();
			return true;
		} else {
			return Session.get('editing_link');
		}
	},
	linkEntered : function() {
		return Session.get('current_facebook_link') && !Session.get('link_is_loading');	
	},
	focusOnNewLink : function() {
		Tracker.afterFlush(function(){
			var element = document.getElementsByClassName('facebook-link-input')[0];
			element.focus();
		});
	},
	
	// If this is a facebook link type item
	// that existed before facebook links were required
	isLegacyLink : function() {
		var currentContents = Session.get('current_item_contents');
		return !detailsHandler.creatingNewItem() && !_.has(currentContents, 'facebook_link') && contentTypeBuilder.isType('link');
	},
	submitLinkUpdate : function() {
		var linkURL = $('.facebook-link-input').val();
		if(linkURL != Session.get('current_facebook_link')) {
			this.updateFacebookLink(linkURL);
		} else {
			this.cancelLinkEdit();
		}
	},
	updateFacebookLink : function(linkURL) {
		if(linkURL != '') {
		
			linkURL = this.addHTTPToUrl(linkURL);
			Session.set('current_facebook_link', linkURL);
			Session.set('editing_link', false);
			Session.set('link_is_loading', true);
			Meteor.call('getLinkResponse', linkURL, function(error, response){
				var linkData = {};
				if(error == null) {
					var linkData = facebookHandler.convertResponseIntoLinkData(response);
				}
				facebookHandler.onLinkDataReturned(linkData);
			});
		}
	},
	addHTTPToUrl : function(linkURL) {
		if (!/^(f|ht)tps?:\/\//i.test(linkURL)) {
			linkURL = "http://" + linkURL;
		}
		return linkURL;	
   },
   getLinkToDisplay : function() {
		var link = this.getFacebookLink();
		if(link.length > 60) {
			link = link.substring(0, 60) + "...";
		}
		return link;
   },
   onLinkInputBlur : function() {
	   this.submitLinkUpdate();
   },
   cancelLinkEdit : function() {
		Session.set('editing_link', false);
		Meteor.flush();
		settingsWindowHandler.changeToKeyMode();
		$('.facebook-link-display').transition('shake');
   },
   convertResponseIntoLinkData : function(response) {
		var indexedTags = {};
		var metaDiv = document.createElement("div");
        if(_.has(response, 'content')){
	        responseText = response.content;
			metaDiv.innerHTML = responseText;
			var titleElement = metaDiv.getElementsByTagName("title");
			var title = titleElement.length ? titleElement[0].innerHTML : 'None';
			indexedTags['element_title'] = title;
			indexedTags = this.addMetaTagsToIndexedTags(indexedTags, metaDiv);
        }
		return indexedTags;
	},
	changeToLinkKeyMode : function() {
		keyStrokeHandler.setKeyMode('input', 'approval_item_link');	
	},
	addMetaTagsToIndexedTags : function(indexedTags, metaDiv) {
		var metaTags = metaDiv.getElementsByTagName("meta");
		_.map(metaTags, function(metaTag){
			var key = metaTag.getAttribute('property');
			var content = metaTag.getAttribute('content');
			if(key == null) {
				key = metaTag.getAttribute('name');
			}
			indexedTags[key] = content;
		});
		return indexedTags;
	},
	onLinkDataReturned : function(linkData) {
		Session.set('current_facebook_link_data', linkData);
		inputBuilder.initializeClickableInputs();
		
		// because this is set based on the image url returned in the link data
		// we need to set it as null here
		Session.set('uploaded_image_url', null);
		Session.set('link_is_loading', false);
		Session.set('changes_made', true);
		Meteor.flush();
		settingsWindowHandler.changeToKeyMode();
		$('.facebook-link-display').transition('pulse');
	},
	getFacebookLink : function() {
		return Session.get('current_facebook_link');
	},
	onClickFacebookLink : function() {
		Session.set('editing_link', true);
		Meteor.flush();
		Meteor.defer(function(){
			var element = document.getElementsByClassName('facebook-link-input')[0];
			if(!Session.equals('current_facebook_link', null)) {
				$('.facebook-link-input').val(facebookHandler.getFacebookLink());	
			}
			element.focus();
		});
	},
	handleEditingLink : function() {
		
	},
};