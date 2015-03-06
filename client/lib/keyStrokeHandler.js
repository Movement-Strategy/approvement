keyStrokeHandler = {
	keyStrokeMap : {
		13 : 'enter',
		9 : 'tab',
		27 : 'escape',
		39 : 'right',
		37 : 'left',
		16 : 'shift',
	},
	currentTypes : {},
	types : function(scope, typesToSet) {
		_.map(typesToSet, function(typeDetails, typeName){
			if(!_.has(keyStrokeHandler.currentTypes, scope)) {
				keyStrokeHandler.currentTypes[scope] = {};
			}
			keyStrokeHandler.currentTypes[scope][typeName] = typeDetails;
		});
	},
	bindToWindow : function() {
		$(document).on('keydown', keyStrokeHandler.handleKeyStrokes);
		$(document).on('keyup', keyStrokeHandler.onKeyDownWindow);		
	},
	allowWeekChangeOnArrowPress : function() {
		var isRightTemplate = mainContentHandler.isShown('draftBoard') || mainContentHandler.isShown('contentCalendar') || mainContentHandler.isShown('bucketOverview');
		return isRightTemplate && !Session.get('entering_draft_item_text') && !settingsWindowHandler.isShown();
	},
	onKeyDownWindow : function() {
		keyStrokeHandler.handleKeyStrokesOnWindow('up', event);
	},
	handleKeyStrokesOnWindow : function(keyDirection, event) {
		var scope = Session.get('key_scope');
		if(scope == 'window') {
			keyStrokeHandler.handleAllKeyStrokes(scope, keyDirection, event, {});
		}
	},
	handleAllKeyStrokes : function(scope, keyDirection, event, context) {
		var mode = Session.get('key_mode');
		var modeDetails = this.getModeDetails(scope, mode);
		this.handleDynamicKeyEvents(modeDetails, keyDirection, event, context);
	},
	handleKeyStrokesOnInput : function(keyDirection, event, context) {
		var scope = Session.get('key_scope');
		if(scope == 'input') {
			this.handleAllKeyStrokes(scope, keyDirection, event, context);
		}
	},
	handleDynamicKeyEvents : function(modeDetails, keyDirection, event, context) {
		var keyMap = jQuery.extend(true, {}, this.keyStrokeMap);
		var eventKey = 'key';
		if(_.has(keyMap, event.which)) {
			var eventKey = keyMap[event.which];
		}
		var eventName = 'on_' + eventKey + '_' + keyDirection;
		if(_.has(modeDetails, eventName)) {
			modeDetails[eventName](event, context);
		}
	},
	getModeDetails : function(scope, mode) {
		return this.currentTypes[scope][mode];
	},
	setKeyMode : function(scope, mode) {
		Session.set('key_mode', mode);
		Session.set('key_scope', scope);	
	},
	handleKeyStrokes : function(event) {
		keyStrokeHandler.handleKeyStrokesOnWindow('down', event);
		var allowWeekChangeOnArrowPress = keyStrokeHandler.allowWeekChangeOnArrowPress();
		
		// if an asset is open cancel editted on escape
		if(Session.get('current_asset_type') != null && event.which == 27) {
			assetHandler.resetAndTriggerAnimationOnAsset(Session.get('current_asset_id'), 'shake');
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