keyStrokeHandler = {
	bindToWindow : function() {
		$(document).on('keydown', keyStrokeHandler.handleKeyStrokes);	
	},
	allowWeekChangeOnArrowPress : function() {
		var isRightTemplate = mainContentHandler.isShown('draftBoard') || mainContentHandler.isShown('contentCalendar') || mainContentHandler.isShown('bucketOverview');
		return isRightTemplate && !Session.get('entering_draft_item_text') && !settingsWindowHandler.isShown();
	},
	handleKeyStrokes : function(event) {
		
		var allowWeekChangeOnArrowPress = keyStrokeHandler.allowWeekChangeOnArrowPress();
		
		// if details is hide creation modal submit update on cancel press
		if(settingsWindowHandler.isShown() && event.which == 27 && Session.get('details_can_close')) {
			settingsWindowHandler.hide();
		}
		
		// if details is open submit update on enter press
		if(detailsHandler.detailsShown() && event.which == 13 && Session.get('details_can_close')) {
			var enterPressState = detailsHandler.getEnterPressState();
			stateManager.changeToState(enterPressState);
		}
		
		// if an asset is open cancel editted on escape
		if(Session.get('current_asset_type') != null && event.which == 27) {
			assetHandler.resetAndTriggerAnimationOnAsset(Session.get('current_asset_id'), 'shake');
		}
		
		// if the calendar is open
		if(mainContentHandler.isShown('contentCalendar') && event.which == 9) {	
			pendingItemHandler.goToPendingItem(Session.get('pending_item_index'));
		}
				
		// If details is not open change to last week on left press
		if(allowWeekChangeOnArrowPress && event.which == 37) {
			popupContent.handlePopup('.edit-draft-link', 'hide');
			event.preventDefault();
			detailsHandler.closeShownPopup();
			timeHandler.changeToLastWeek();
		}
		
		// If details is not open change to next week on right press
		if(allowWeekChangeOnArrowPress && event.which == 39) {
			popupContent.handlePopup('.edit-draft-link', 'hide');
			event.preventDefault();
			detailsHandler.closeShownPopup();
			timeHandler.changeToNextWeek();
		}
		
		if(Session.get('entering_draft_item_text') && event.which == 27) {
			$('.content-input').blur();
		}
		
		
		// Submit delete on enter if the prompt modal is open
		if(Session.get('current_prompt_type') != null && event.which == 13) {
			promptModalHandler.handleDelete();
		}
		
		// don't allow change if the draft board is shown and the user is editing text
		
		
		// Submit change on enter press if content bucket modal is shown
		if(contentBucketModalHandler.isShown && event.which == 13) {
			contentBucketModalHandler.handleEnter();
		}
		
		// cancel edit if editing a draft link on escape press
		if(Session.get('edited_draft_link') != null && event.which == 27) {
			draftLinkHandler.handleEscape();
		}
		
		// submit edit if editing a draft link on enter press
		if(Session.get('edited_draft_link') != null && event.which == 13) {
			draftLinkHandler.handleEnter();
		}
		
			
	}
	
};