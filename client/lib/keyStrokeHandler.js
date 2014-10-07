keyStrokeHandler = {
	handleKeyStrokes : function(event) {
		
		// if details is hide creation modal submit update on cancel press
		if(Session.get('details_shown') && event.which == 27 && Session.get('details_can_close')) {
			detailsHandler.hideDetails();
		}
		
		// if details is open submit update on enter press
		if(Session.get('details_shown') && event.which == 13 && Session.get('details_can_close')) {
			stateManager.changeToState('updated');
		}
		
		// if an asset is open cancel editted on escape
		if(Session.get('current_asset_type') != null && event.which == 27) {
			assetHandler.resetAndTriggerAnimationOnAsset(Session.get('current_asset_id'), 'shake');
		}
		
		// If details aren't open, go the next pending item on tab press
		if(!Session.get('details_shown') && event.which == 9) {	
			pendingItemHandler.goToPendingItem(Session.get('pending_item_index'));
		}
		
		// If details is open change to last week on left press
		if(!Session.get('details_shown') && event.which == 37) {
			timeHandler.changeToLastWeek();
		}
		
		// If details is open change to next week on right press
		if(!Session.get('details_shown') && event.which == 39) {
			timeHandler.changeToNextWeek();
		}
		
		// Submit delete on enter if the prompt modal is open
		if(Session.get('current_prompt_type') != null && event.which == 13) {
			promptModalHandler.handleDelete();
		}
			
	}
	
};