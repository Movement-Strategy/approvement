contentBucketModalHandler = {
	modalSelector : '.content-bucket-modal',
	initializeModal : function() {
		Meteor.defer(function(){
			$(this.modalSelector).modal();
		});
	},
	showModal : function(context, creatingNew) {
		this.setSessionVariablesOnShow(context, creatingNew);
		$(this.modalSelector).modal('show');
	},
	hideModal : function() {
		$(this.modalSelector).modal('hide');
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
		this.hideModal();
	},
	onCreateContentBucket : function(event) {
		var bucket = this.buildNewBucket(event);
		Meteor.call('insertContentBucket', bucket);
		this.hideModal();
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
		var repeats = $('.ui.form.content-bucket-form').form('setting', {debug : false}).form('get field', 'repeats').prop('checked');
		return {
			description : description,
			repeats : repeats,
		};
	}
};