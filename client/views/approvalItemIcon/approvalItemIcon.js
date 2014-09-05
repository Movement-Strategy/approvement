Template['approvalItemIcon'].helpers({
	popup_content : function() {
		var content = popupContent.getContent(this.type, this.content_type, this.contents).content;
		var that = this;
		if(Session.get('show_popups')) {
			Meteor.defer(function(){
				$('#label_' + that._id).popup({
					position : 'top center',
				});
			});
		}
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
		prepareModalToShow(this, false);	
	},
});

