navButtonHandler = {
	getButtonMap : function() {
		return {
			draft_board : {
				style_class : 'draft-board',
				icon : 'calendar',
				hover_text : 'Draft Board',
				main_content_template : 'draftBoard',
				is_shown : function() {
					return true;
					// if draft board isn't shown
					// if the user is a manager
					// if a client is selected
				},
			},
		};	
	},
	getNavButtons : function() {
		return _.chain(jQuery.extend(true, {}, this.getButtonMap()))
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
};