navButtonHandler = {
	getButtonMap : function() {
		var map = {
			client_overview : {
				style_class : 'client-overview',
				icon : 'tasks',
				is_shown : function() {
					return !dataTableHandler.typeIsShown('client_overview');
					// if the user isn't client	
					// if the client overview isn't show
				},
				hover_text : 'Overview',
			},
			draft_board : {
				style_class : 'draft-board',
				icon : 'lab',
				hover_text : 'Draft Board',
				is_shown : function() {
					return !navHandler.isOnRoute('draft_board') && !navHandler.isOnRoute('client_overview') && !navHandler.isOnRoute('show_overview');
					// if draft board isn't shown
					// if the user is a manager
					// if a client is selected
				},
			},
			content_calendar : {
				style_class : 'calendar-board',
				icon : 'calendar',
				hover_text : 'Approval Calendar',
				is_shown : function() {
					return !navHandler.isOnRoute('content_calendar') && !navHandler.isOnRoute('client_overview');
					
					// if the calendar isn't shown
					// if a client is selected
				},	
			},
			show_overview : {
				style_class : 'shows',
				icon : 'video',
				hover_text : 'Shows',
				is_shown : function() {
					return clientHandler.getSelectedClientID() == 'tru_tv' && !navHandler.isOnRoute('show_overview') && !navHandler.isOnRoute('client_overview');
				},
			},
			notification : {
				style_class : 'notification',
				hover_text : 'Send Notification',
				icon : 'mail',
				is_shown : function() {
					return !navHandler.isOnRoute('client_overview');
					// if a client is selected
				},
				on_click : function() {
					notificationModalHandler.showModal();
				},
			},
		};
		return jQuery.extend(true, {}, map);
	},
	getNavButtons : function() {
		var buttons =  _.chain(this.getButtonMap())
			.map(function(details, buttonName){
				if(details.is_shown()) {
					return {
						button_name : buttonName,
						hover_text : details.hover_text,
						icon : details.icon,
						style_class : details.style_class,
					};
				}
			})
			.compact()
		.value();
		
		return buttons;
	},
	initializePopup : function(context) {
		var id = '#nav_button_' + context.button_name;
		$(id).popup('destroy');
		Meteor.defer(function(){
			$(id).popup({refresh : true});
		});
	},
	hidePopups : function() {
		Meteor.defer(function(){
			$('.nav-icon').popup('hide all');
		});
	},
	getTypeAndRun : function(type, typeFunction) {
		var buttonMap = this.getButtonMap();
		var typeDetails = buttonMap[type];
		return typeFunction(typeDetails);
	},
	onClick : function(context) {
		this.getTypeAndRun(context.button_name, function(typeDetails){
			if(_.has(typeDetails, 'on_click')) {
				typeDetails.on_click(context);
			}
			navButtonHandler.hidePopups();
			navHandler.onNavButtonClick(context.button_name);
		});
	},
};