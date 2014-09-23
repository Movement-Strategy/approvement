
Template['creationAssetIcon'].helpers({
	popup_content : function() {
		var selector = '#' + this._id;
		Meteor.defer(function(){
			$(selector).popup({
				position : 'top center',
			});
		});
		return "<span class='asset-content'>" + this.url + '</span>';
	},
});

Template['creationAssetIcon'].events({
	'click .edit-icon' : function(event) {	
		var clickedID = event.currentTarget.id;
		$('#' + clickedID).popup('hide');
		Session.set('current_asset_id', clickedID);
		Session.set('details_can_close', false);
	}
});

