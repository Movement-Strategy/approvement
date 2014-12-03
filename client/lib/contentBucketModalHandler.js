contentBucketModalHandler = {
	modalSelector : '.content-bucket-modal',
	
	modalInitSettings : {
		selector : {
			close : '.none', 
			approve : '.none', 
			deny : '.none',
		},
		detachable : false,
	},
	initializeModal : function() {
		Meteor.defer(function(){
			$(this.modalSelector).modal();
		});
	},
	handleModal : function(params) {
		var that = this;
		Meteor.defer(function(){
			$(that.modalSelector).modal(params);
		});
	},
	showModal : function(context, creatingNew) {
		this.setSessionVariablesOnShow(context, creatingNew);
		this.handleModal('show');
	},
	hideModal : function() {
		this.handleModal('hide');
	},
	setSessionVariablesOnShow : function(context, creatingNew) {
		Session.set('creating_new_bucket', creatingNew);
		if(!creatingNew) {
			var bucket = contentBucketHandler.getBucketByID(context['content_bucket_id']);
			Session.set('current_content_bucket', bucket);
		} else {
			Session.set('current_content_bucket', {});
			$('.description-input').val('');
		}
	},
	onEditContentBucket : function(event) {
		var variablesFromModal = this.getVariablesFromModal(event);
		var query = {
			$set : variablesFromModal,
		};
		Meteor.call('updateContentBucket', Session.get('current_content_bucket')['_id'], query);
// 		this.hideModal();
	},
	onCreateContentBucket : function(event) {
		var bucket = this.buildNewBucket(event);
		Meteor.call('insertContentBucket', bucket);
// 		this.hideModal();
	},
	buildNewBucket : function(event) {
		var bucket = this.getVariablesFromModal(event);	
		bucket['client_id'] = Session.get('selected_client_id');
		bucket['draft_variables'] = {};
		bucket['week'] = timeHandler.getWeekForSelectedTime();
		return bucket;
	},
	getVariablesFromModal : function(event) {
		var description = $('.description-input').val();
		var repeats = Session.get('bucket_is_repeating');
		return {
			description : description,
			repeats : repeats,
		};
	}
};