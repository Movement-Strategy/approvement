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
			$('.prompt-modal').modal();
		});
	},
	getContent : function() {
		var currentPromptType = Session.get('current_prompt_type');
		return _.has(this.promptMap, currentPromptType) ? this.promptMap[Session.get('current_prompt_type')]['message'] : '';
	},
	getButtons : function() {
		if(Session.get('current_prompt_type')) {
			var buttonNames = this.promptMap[Session.get('current_prompt_type')]['buttons'];
			var buttons = _.map(buttonNames, function(buttonName){
				var button = promptModalHandler.promptButtonMap[buttonName];
				button['class'] = buttonName;
				return button;
			});
			return buttons;
		} else {
			return [];
		}
	},
	promptMap : {
		approval_item : {
			on_delete : function() {
				promptModalHandler.deleteApprovalItem();
			},
			message : "Are you sure you want to delete this item? It can't be undone",
			buttons : [
				'undo',
				'delete',
			],
		},
		asset : {
			on_delete : function() {
				promptModalHandler.deleteAsset();
			},
			message : "Are you sure you want to delete this asset? It can't be undone",
			buttons : [
				'undo',
				'delete',
			],
		},
		exit_asset : {
			on_exit : function() {
				detailsHandler.onHideDetails();
				promptModalHandler.hide();	
			},
			message : "Are you sure you want to exit?  There are unsaved changes",
			buttons : [
				'undo',
				'exit',
			],
		},
	},
	promptButtonMap : {
		'delete' : {
			color : 'red',
			display : 'delete',
		},
		'undo' : {
			color : 'green',
			display : 'undo',
		},
		'exit' : {
			color : 'red',
			display : 'exit',
		},
	},
	handleExit : function() {
		this.promptMap[Session.get('current_prompt_type')]['on_exit']();
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
