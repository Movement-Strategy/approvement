pageLoadHandler = {
	
	onStartUp : function() {
		timeHandler.createMomentDate();
		clientHandler.setSelectedClient();
		assetHandler.handleAssetID();
		assetHandler.updateCurrentAssets();
		gifHandler.handleSuccessGif();
	},
	checkIfPageIsReady : function() {
		Deps.autorun(function(){
			
			// as the page is loading, make sure all of the content thats required from collections is ready before loading
			if(Session.get('approval_items_are_ready') && Session.get('clients_are_ready') && Session.get('comments_are_ready')) {
				Session.set('page_is_ready', true);
			}
		});
	},
	pageIsReady : function() {
		return Session.get('page_is_ready');
	},
	defaultSessionValueMap : {
		show_popups : true,
		approval_items_are_ready : false,
		clients_are_ready : false,
		page_is_ready : false,
		details_shown : false,
		current_item_contents : {},
		show_gif : false,
		changes_made : false,
		approval_items_by_day : {},
		current_clients : [],
		clients_by_id : {},
		current_network_type : null,
		current_content_type : null,
		selected_client : false,
		details_can_close : true,
		total_pending_items : null,
		pending_item_index : 0,
		allow_date_change : true,
		users_to_notify : [],
		email_sent : false,
		editing_link : false,
		link_is_loading : false,
		current_facebook_link_data : {},
		current_facebook_link : "",		
	},
	setSessionDefaults : function() {
		_.map(this.defaultSessionValueMap, function(value, key){
			Session.setDefault(key, value);
		});
	}
};