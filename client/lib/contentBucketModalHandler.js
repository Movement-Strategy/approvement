contentBucketModalHandler = {
	modalSelector : '.content-bucket-modal',
	initializeModal : function() {
		Meteor.defer(function(){
			$(this.modalSelector).modal();
		});
	},
	showModal : function(context) {
		this.setSessionVariablesOnShow(context);
		$(this.modalSelector).modal('show');
	},
	hideModal : function() {
		$(this.modalSelector).modal('hide');
	},
	setSessionVariablesOnShow : function(context) {
		var bucket = contentBucketHandler.getBucketByID(context['content_bucket_id']);
		Session.set('current_content_bucket', bucket);
	},
	onEditContentBucket : function(event) {
		var description = $('.description-input').val();
		var repeats = $('.ui.form.content-bucket-form').form('setting', {debug : false}).form('get field', 'repeats').prop('checked');
		var query = {
			$set : {
				description : description,
				repeats : repeats,
			},
		};
		Meteor.call('updateContentBucket', Session.get('current_content_bucket')['_id'], query);
	},
};