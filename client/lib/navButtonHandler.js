navButtonHandler = {
	getButtonMap : function() {
		var map = {
			draft_board : {
				style_class : 'draft-board',
				icon : 'lab',
				hover_text : 'Draft Board',
				main_content_template : 'draftBoard',
				is_shown : function() {
					return !mainContentHandler.isShown('draftBoard');
					return true;
					// if draft board isn't shown
					// if the user is a manager
					// if a client is selected
				},
			},
			calendar : {
				style_class : 'calendar-board',
				main_content_template : 'contentCalendar',
				icon : 'calendar',
				hover_text : 'Approval Calendar',
				is_shown : function() {
					return !mainContentHandler.isShown('contentCalendar');
					
					// if the calendar isn't shown
					// if a client is selected
				},	
			},
			shows : {
				style_class : 'shows',
				main_content_template : 'showOverview',
				icon : 'video',
				hover_text : 'Shows',
				is_shown : function() {
					// only show shows for truTV
					return clientHandler.getSelectedClientID() == 'tru_tv';
				},
			},
			notification : {
				style_class : 'notification',
				hover_text : 'Send Notification',
				icon : 'mail',
				is_shown : function() {
					return true;
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
		this.initializePopups();
		return _.chain(this.getButtonMap())
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
	},
	initializePopups : function() {
		Meteor.defer(function(){
			$('.nav-icon').popup();
		});	
	},
	hidePopups : function() {
		Meteor.defer(function(){
			$('.nav-icon').popup('hide');
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
			if(_.has(typeDetails, 'main_content_template')) {
				var clientID = Session.get('selected_client_id');
				var weekID = timeHandler.getWeekForSelectedTime();
				mainContentHandler.changeToTemplate(typeDetails.main_content_template, clientID, weekID);
			}
		});
	},
};