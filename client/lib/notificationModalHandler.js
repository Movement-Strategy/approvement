notificationModalHandler = {
	hideModal : function() {
		this.handleModal('hide');
	},
	emailSent : function() {
		return Session.get('email_sent');
	},
	showModal : function() {
		this.handleModal('show');
	},
	handleModal : function(params) {
		Meteor.defer(function(){
			$('.notification-modal').modal(params);
		});
	},
	initializeModal : function() {
		this.handleModal({});
	},
	onClickSend : function(template) {
		var selectedItems = template.findAll( "input[type=checkbox]:checked");
		var selectedValues = _.map(selectedItems, function(selectedItem){
			return selectedItem.defaultValue;
		});
		console.log(selectedValues);
		this.triggerSuccess();
		this.hideModal();
	},
	triggerSuccess : function() {
		Session.set('email_sent', true);
		Meteor.setTimeout(function(){
			Session.set('email_sent', false);
		}, 2000);
	}
};