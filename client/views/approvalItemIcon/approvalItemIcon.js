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
	}
});

Template['approvalItemIcon'].events({
	'click' : function() {
		var creatingNew = false;
		detailsHandler.showDetails(this, creatingNew);
	},
	'mouseenter .approval-item' : function(event) {
		Session.set('shown_popup_id', event.currentTarget.id);
	}
});

