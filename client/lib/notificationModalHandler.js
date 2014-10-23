notificationModalHandler = {
	hideModal : function() {
		this.handleModal('hide');
	},
	emailSent : function() {
		return Session.get('email_sent');
	},
	showModal : function() {
		$(".custom-notification").val('');
		this.handleModal('show');
	},
	handleModal : function(params) {
		Meteor.defer(function(){
			$('.notification-modal').modal(params);
		});
	},
	initializeCheckboxes : function() {
		Meteor.defer(function(){
			$('.notification-check').checkbox();
		});
	},
	initializeModal : function() {
		this.handleModal({});
	},
	onClickSend : function(template) {
		this.sendNotifications(template)
		this.triggerSuccess();
		this.hideModal();
	},
	getSelectedUsernamesFromModal : function(template) {
		var selectedItems = template.findAll( "input[type=checkbox]:checked");
		var selectedUsernames = _.map(selectedItems, function(selectedItem){
			return selectedItem.defaultValue;
		});
		return selectedUsernames;
	},
	sendNotifications : function(template) {
		var selectedUsernames = this.getSelectedUsernamesFromModal(template);
		_.map(selectedUsernames, function(username){
			var email = notificationModalHandler.buildEmailFromUsername(username);
			Meteor.call('sendNotificationEmail', email.to, email.from, email.subject, email.body);
		});
	},
	getCustomNotificationText : function() {
		return $(".custom-notification").val();
	},
	getEmailURL : function() {
		return 'http://mvmt-approve.herokuapp.com/client/' + Session.get('selected_client_id') + '/week/' + timeHandler.getWeekForSelectedTime();
	},
	buildEmailFromUsername : function(userName) {
		var userToNotify = Session.get('users_to_notify')[userName];
		var from = "mvmt.approve@movementstrategy.com";
		var to = userToNotify.email;
		var displayName = Session.get('selected_client').display_name;
		var subject = "MVMT Approve : Content for " + displayName + " needs attention";
		var customText = this.getCustomNotificationText();
		
		var body = "Hi " + userToNotify['name'].split(" ")[0] + ',\n'
			+ "\n"
			+ "Please go to " + this.getEmailURL() + " to see the items that are pending for " + displayName + "\n"
			+ "\n";
		
		if(customText != '') {
			body = body + Session.get('user_name') + " added the following message:\n"
				+ "\n"
				+ customText 
				+ "\n";
		}
		return {
			from : from,
			to : to,
			subject : subject,
			body : body,
		};
	},
	triggerSuccess : function() {
		Session.set('email_sent', true);
		Meteor.setTimeout(function(){
			Session.set('email_sent', false);
		}, 2000);
	}
};