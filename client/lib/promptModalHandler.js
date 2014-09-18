promptModalHandler = {
	hide : function() {
		Session.set('current_prompt_type', null);
		$('.prompt-modal').modal('hide');
		Meteor.defer(function(){
			Session.set('details_can_close', true);
		});
	},
	show : function(promptType) {
		Session.set('current_prompt_type', promptType);
		Session.set('details_can_close', false);
		$('.prompt-modal').modal('show');
	},
	handleDelete : function() {
		var promptType = Session.get('current_prompt_type');
		var promptDetails = this.promptMap[promptType];
		promptDetails['on_delete']();
	},
	initializeModal : function(){
		Meteor.defer(function(){
			$('.prompt-modal').modal({
				context : $('#main'),
			});
		});
	},
	promptMap : {
		approval_item : {
			on_delete : function() {
				promptModalHandler.deleteApprovalItem();
			},
		},
		asset : {
			on_delete : function() {
				promptModalHandler.deleteAsset();
			}
		},
	},
	deleteAsset : function() {
		Meteor.call('removeAsset', Session.get('current_asset_id'));
		assetHandler.resetAssetTemplate();
	},
	deleteApprovalItem : function() {
		Meteor.call('removeItem', Session.get('current_item_id'));
		detailsHandler.hideDetails();
		promptModalHandler.hide();
	}
};

/*
*/
