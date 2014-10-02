facebookHandler = {
	getProfilePictureURL : function() {
		var profileName = Session.get('selected_client').facebook_profile_name;
		return this.getPictureURL(profileName);
	},
	getPictureURL : function(id) {	
		return 'http://graph.facebook.com/' + id + '/picture?size=square';
	},
	editingLink : function() {
		if(this.getFacebookLink() == null) {
			return true;
		} else {
			return Session.get('editing_link');
		}
	},
	linkEntered : function() {
		return Session.get('current_facebook_link') && !Session.get('link_is_loading');	
	},
	onLinkInputKeydown : function(event) {
		this.handleEnterPress(event);
		this.handleEscapePress(event);
	},
	handleEnterPress : function(event) {
		if(event.which == 13) {
			var linkURL = $('.facebook-link-input').val();
			this.updateFacebookLink(linkURL);
		}
	},
	updateFacebookLink : function(linkURL) {
		if(linkURL != '') {
			Session.set('current_facebook_link', linkURL);
			Session.set('editing_link', false);
			Session.set('link_is_loading', true);
			Meteor.call('getLinkData', linkURL, function(error, response){
				var linkData = facebookHandler.convertResponseIntoLinkData(response);
				facebookHandler.onLinkDataReturned(linkData);
			});
		}
	},
	convertResponseIntoLinkData : function(response) {
		var metaDiv = document.createElement("div");
        responseText = result.content;
		metaDiv.innerHTML = responseText;
		var titleElement = metaDiv.getElementsByTagName("title");
		var title = titleElement.length ? titleElement[0].innerHTML : 'None';
		var metaTags = metaDiv.getElementsByTagName("meta");
		var indexedTags = {};
		_.map(metaTags, function(metaTag){
			indexedTags[metaTag.getAttribute('property')] = metaTag.getAttribute('content');
		});
		console.log(indexedTags);
	},
	onLinkDataReturned : function(linkData) {
		Session.set('current_facebook_link_data', linkData);
		inputBuilder.initializeClickableInputs();
		
		// because this is set based on the image url returned in the link data
		// we need to set it as null here
		Session.set('uploaded_image_url', null);
		Session.set('link_is_loading', false);
		Meteor.flush();
		$('.facebook-link-display').transition('pulse', onHide = function(){
			Session.set('details_can_close', true);
		});
	},
	handleEscapePress : function(event) {
		if(event.which == 27) {
			Session.set('editing_link', false);
			Meteor.flush();
			$('.facebook-link-display').transition('shake', onHide = function(){
				Session.set('details_can_close', true);
			});
		}
	},
	getFacebookLink : function() {
		return Session.get('current_facebook_link');
	},
	onClickFacebookLink : function() {
		Session.set('editing_link', true);
		Meteor.flush();
		Meteor.defer(function(){
			if(!Session.equals('current_facebook_link', null)) {
				$('.facebook-link-input').val(facebookHandler.getFacebookLink());	
			}
			$('.facebook-link-input').focus();	
		});
	},
};