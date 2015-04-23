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
		$(document).on('keydown', keyStrokeHandler.onKeyDownWindow);
		$(document).on('keyup', keyStrokeHandler.onKeyUpWindow);		
	},
	onKeyUpWindow : function() {
		keyStrokeHandler.handleKeyStrokesOnWindow('up', event);
	},
	handleKeyStrokesOnWindow : function(keyDirection, event) {
		var scope = Session.get('key_scope');
		if(scope == 'window' && this.allowKeyStrokeHandling(scope)) {
			keyStrokeHandler.handleAllKeyStrokes(scope, keyDirection, event, {});
		}
	},
	handleAllKeyStrokes : function(scope, keyDirection, event, context) {
		var mode = Session.get('key_mode');
		var modeDetails = this.getModeDetails(scope, mode);
		this.handleDynamicKeyEvents(modeDetails, keyDirection, event, context, scope);
	},
	handleKeyStrokesOnInput : function(keyDirection, event, context) {
		var scope = Session.get('key_scope');
		if(scope == 'input' && this.allowKeyStrokeHandling(scope)) {
			this.handleAllKeyStrokes(scope, keyDirection, event, context, scope);
		}
	},
	allowKeyStrokeHandling : function(scope) {
		var allow = true;
		var previousScope = Session.get('previous_key_scope');;
		// if the scope has changed within the last 50 ms, then don't trigger key events
		if(previousScope != null && scope != previousScope) {
			
			var allow = false;
		}
		return allow;
	},
	handleDynamicKeyEvents : function(modeDetails, keyDirection, event, context, scope) {
		var keyMap = jQuery.extend(true, {}, this.keyStrokeMap);
		var eventKey = 'key';
		if(_.has(keyMap, event.which)) {
			var eventKey = keyMap[event.which];
		}
		var eventName = 'on_' + eventKey + '_' + keyDirection;
		if(_.has(modeDetails, eventName)) {
			modeDetails[eventName](event, context);
		}
		this.setPreviousKeyScope(scope);
	},
	setPreviousKeyScope : function(scope) {
		Session.set('previous_key_scope', scope);
		Meteor.setTimeout(function(){
			Session.set('previous_key_scope', null);
		}, 15);	
	},
	getModeDetails : function(scope, mode) {
		return this.currentTypes[scope][mode];
	},
	setKeyMode : function(scope, mode) {
		Session.set('key_mode', mode);
		Session.set('key_scope', scope);	
	},
	onKeyDownWindow : function(event) {
		keyStrokeHandler.handleKeyStrokesOnWindow('down', event);
	}
	
};