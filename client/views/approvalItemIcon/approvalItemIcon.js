Template['approvalItemIcon'].helpers({
	popup_content : function() {
		var content = popupContent.getContent(this.type, this.content_type, this.contents).content;
		var that = this;
		popupContent.initializePopup(that);
		return content;
	},
	label_color : function() {
		if(calendarBuilder.itemIsDraggedOutsideOfCalendar(this)) {
			return 'red';
		} else {
			return this.label_color;
		}
	},
	label_icon : function() {
		if(calendarBuilder.itemIsDraggedOutsideOfCalendar(this)) {
			return 'trash';
		} else {
			return this.label_icon;
		}
	},
	popup_title : function() {
		return popupContent.getContent(this.type, this.content_type, this.contents).title;
	},
	label_id : function() {
		return this._id;
	},
	initializeDraggable : function() {
		var that = this;
		Meteor.defer(function(){
			var labelElement = '#label_' + that._id;
			var params = {
				refreshPositions : true,
				revert : function(droppedOn) {
					return approvalItemBuilder.draggedItemShouldRevert(droppedOn);
				},
 				start : function(event, ui) {
					approvalItemBuilder.onDragStart(event);
				},
				stop : function(event, ui) {
					Session.set('popups_disabled', false);
					approvalItemBuilder.onDragStop(event);
				}
			};
			$(labelElement).draggable(params);
		});	
	},
});

Template['approvalItemIcon'].events({
	'click' : function() {
		var creatingNew = false;
		detailsHandler.showDetails(this, creatingNew);
	},
	'mouseenter .approval-item' : function(event) {
		popupContent.onMouseEnter(event);
	},
});

