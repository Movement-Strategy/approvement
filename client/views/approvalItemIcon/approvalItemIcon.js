Template['approvalItemIcon'].helpers({
	popup_content : function() {
		var content = popupContent.getContent(this.type, this.content_type, this.contents).content;
		var that = this;
		popupContent.initializePopup(that);
		return content;
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
				revert : true,
				start : function(event, ui) {
					approvalItemBuilder.onDragStart(event);
				},
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

