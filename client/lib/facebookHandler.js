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
		return Session.get('current_facebook_link');	
	},
	onLinkInputKeydown : function(event) {
		this.handleEnterPress(event);
		this.handleEscapePress(event);
	},
	handleEnterPress : function(event) {
		if(event.which == 13) {
			var linkURL = $('.facebook-link-input').val();
			if(linkURL != '') {
				Session.set('current_facebook_link', linkURL);
				Session.set('editing_link', false);
				Meteor.flush();
				$('facebook-link-display').transition('pulse', onHide : function(){
					Session.set('details_can_close', true);
				});
			}
		}
	},
	handleEscapePress : function(event) {
		if(event.which == 27) {
			Session.set('editing_link', false);
		}
	},
	getFacebookLink : function() {
		return Session.get('current_facebook_link');
	},
	onClickFacebookLink : function() {
		Session.set('editing_link', true);
		Meteor.flush();
		Meteor.defer(function(){
			$('.facebook-link-input').focus();	
		});
	},
};