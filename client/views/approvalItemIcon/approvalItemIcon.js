Template['approvalItemIcon'].helpers({
	popup_content : function() {
		var content = this.contents.link_text;
		var that = this;
		Meteor.defer(function(){
			$('#label_' + that._id).popup({debug : true});
		});
		return content;
	},
	popup_title : function() {
		return this.contents.link_body;
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

