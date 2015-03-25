contentBucketModalHandler = {
	modalSelector : '.content-bucket-modal',
	handleModal : function(params) {
		var that = this;
		Meteor.defer(function(){
			$(that.modalSelector).modal(params);
		});
	},
	changeToKeyMode : function() {
		keyStrokeHandler.setKeyMode('window', 'content_bucket_modal');	
	},
	isShown : false,
	showModal : function(context, creatingNew) {
		this.isShown = true;
		this.setSessionVariablesOnShow(context, creatingNew);
		this.handleModal('show');
		contentBucketModalHandler.initializeRepeatsToggle();
		contentBucketModalHandler.initializeRequiredToggle();
		this.changeToKeyMode();
	},
	hideModal : function() {
		this.isShown = false;
		this.handleModal('hide');
		draftBoardHandler.changeToKeyMode();
	},
	initializeRepeatsToggle : function() {
		var bucket = Session.get('current_content_bucket');
		if(bucket) {
			var isRepeating = bucket['repeats'];
			var onStart = isRepeating ? 'enable' : 'disable';
			Meteor.defer(function(){
				var onEnable = function() {
					Session.set('bucket_is_repeating', true);	
				};
				var onDisable = function() {
					Session.set('bucket_is_repeating', false);	
				};
				
				$('.ui.checkbox.repeats-toggle').checkbox(onStart).checkbox('setting', {onEnable : onEnable, onDisable : onDisable});
			});
		}
	},
	initializeRequiredToggle : function() {
		var bucket = Session.get('current_content_bucket');
		if(bucket) {
			var isRequired = _.has(bucket, 'required') ? bucket['required'] : false;
			var onStart = isRequired ? 'enable' : 'disable';
			Meteor.defer(function(){
				var onEnable = function() {
					Session.set('bucket_is_required', true);	
				};
				var onDisable = function() {
					Session.set('bucket_is_required', false);	
				};
				
				$('.ui.checkbox.required-toggle').checkbox(onStart).checkbox('setting', {onEnable : onEnable, onDisable : onDisable});
			});
		}
	},
	setSessionVariablesOnShow : function(context, creatingNew) {
		Session.set('creating_new_bucket', creatingNew);
		Session.set('bucket_repeat_interval', null);
		if(!creatingNew) {
			var bucket = contentBucketHandler.getBucketByID(context['content_bucket_id']);
			Meteor.defer(function(){
				$('.description-input').val(bucket.description);
			});
			Session.set('current_content_bucket', bucket);
		} else {
			Session.set('current_content_bucket', {});
			$('.description-input').val('');
		}
	},
	onEnterPress : function() {
		this.onBucketChange(Session.get('creating_new_bucket'));
	},
	onBucketChange : function(isInsert) {
		Session.set('bucket_change_errors', {});
		var variablesFromModal = this.getVariablesFromModal();	
		if(_.size(Session.get('bucket_change_errors')) == 0){
			if(isInsert) {
				this.onInsertContentBucket(variablesFromModal);
			} else {
				this.onUpdateContentBucket(variablesFromModal);
			}
			this.hideModal();
			Session.set('bucket_change_errors', {});	
		}
	},
	onUpdateContentBucket : function(variablesFromModal) {
		var query = {
			'$set' : variablesFromModal,
		};
		Meteor.call('updateContentBucket', Session.get('current_content_bucket')['_id'], query, function(error, result){
			warningMessageHandler.showMessage("Bucket Updated", "success");
		});
	},
	onInsertContentBucket : function(variablesFromModal) {
		var bucket = variablesFromModal;
		bucket['client_id'] = clientHandler.getSelectedClientID();
		bucket['draft_variables'] = {};
		bucket['week'] = timeHandler.getWeekForSelectedTime();
		Meteor.call('insertContentBucket', bucket, function(error, result){
			warningMessageHandler.showMessage("Bucket Created", "success");
		});
	},
	getVariablesFromModal : function() {
		var bucketChangeErrors = Session.get('bucket_change_errors');
		var description = $('.description-input').val();
		var repeats = Session.get('bucket_is_repeating');
		var required = Session.get('bucket_is_required');
		var repeatInterval = Session.get('bucket_repeat_interval') == null ? 'weekly' : Session.get('bucket_repeat_interval');
		if(description == '' || description == null) {
			bucketChangeErrors['description'] = true;
		}
		Session.set('bucket_change_errors', bucketChangeErrors);
		
		var bucket = {
			description : description,
			repeats : repeats,
			required : required,
		};
		
		if(repeats) {
			bucket['repeat_interval'] = repeatInterval;
		}
		
		return bucket;
	}
};