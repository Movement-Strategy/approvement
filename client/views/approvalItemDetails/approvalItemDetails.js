Template['approvalItemDetails'].helpers({
	clickable_inputs : function() {
		return Session.get('clickable_inputs');
	},
	creating_new_item : function() {
		return Session.get('creating_new_item');
	},
 	is_content_type_chosen : function() {
		return Session.get('current_content_type') != null;
	},
	details_shown : function() {
		return Session.get('details_shown');	
	},
});

Template['approvalItemDetails'].events({
});

