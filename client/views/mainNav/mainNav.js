Template['mainNav'].helpers({
	show_dropdown : function() {
		return !Session.get('details_shown');
	},
	user_picture : function() {
		return Session.get('user_picture');
	},
	signed_in : function() {
		return Meteor.userId() != null;
	},
	initializeDropdown : function() {
		Meteor.defer(function(){
			$('.user-image-container').dropdown();
		});
	}
});

Template['mainNav'].events({
	'click .sign-out' : function() {
		Meteor.logout();
		Session.set('clients_are_ready', false);
	}
});

