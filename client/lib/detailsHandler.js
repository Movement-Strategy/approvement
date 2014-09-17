detailsHandler = {
	detailsShown : function(){
		return Session.get('details_shown');
	},
	showDetails : function(context, creatingNewItem) {
		this.closeShownPopup();
		this.setDefaultsOnShow(context, creatingNewItem);
		if(!creatingNewItem) {
			this.configureDetailsForNewItem(context);
		}
		Session.set('details_shown', true);
	},
	setDefaultsOnShow : function(context, creatingNewItem) {
		Session.set('time_to_post', null);
		Session.set('editing_time', true);
		Session.set('uploaded_image_url', null);
		Session.set('current_item_id', context._id);
		
		Session.set('current_scope', context.scope);
		Session.set('current_content_type', null);
		Session.set('current_network_type', null);
		Session.set('current_scheduled_time', context.day.scheduled_time);
		Session.set('creating_new_item', creatingNewItem);
		var currentItemContents = creatingNewItem ? {} : context.contents;
		Session.set('current_item_contents', currentItemContents);
	},
	configureDetailsForNewItem: function(context) {
		Session.set('time_to_post', context.time_to_post);
		if(context.time_to_post != null) {
			Session.set('editing_time', false);
		}
		Session.set('current_network_type', context.type);
		Session.set('current_content_type', context.content_type);
		Session.set('time_to_post', context.time_to_post);
		inputBuilder.initializeClickableInputs();
	},
	closeShownPopup : function() {
		$('#' + Session.get('shown_popup_id')).popup('hide');
	}
	
	
};