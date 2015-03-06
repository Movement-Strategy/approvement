inputBuilder = {
	inputMap : {
		facebook : {
			inputs_for_content_bucket : {
				link : 'description',
				photo : 'description',
				status : 'description',
			},
			input_types : {
				description : {
					default_text : 'Choose some text for the post',
					style_class : 'link-description',
					input_category : 'primary_text',
				},
				link_body : {
					default_text : 'Title Included with Link',
					style_class : 'link-title',
					meta_tag : 'og:title',
					on_meta_tag_not_found : function(indexedTags, input) {
						return _.has(indexedTags, 'element_title') ? indexedTags['element_title'] : input.text;
					},
					input_category : 'title_of_external_link',
				},
				link_text : {
					default_text : 'Detailed Link Description',
					style_class : 'link-text',
					meta_tag : 'og:description',
					on_meta_tag_not_found : function(indexedTags, input) {
						return _.has(indexedTags, 'description') ? indexedTags['description'] : input.text;
					},
					input_category : 'description_of_external_link',
				},
			},
			inputs_by_content_type : {
				link : [
					'link_body',
					'link_text',
					'description',
				],
				photo : [
					'description',
				],
				status : [
					'description',
				],
			},
		},
		twitter : {
			inputs_for_content_bucket : {
				with_picture : 'tweet_body',
				without_picture : 'tweet_body',
			},
			input_types : {
				tweet_body : {
					default_text : "Choose some text for your tweet",
					style_class : 'twitter-body',
					input_category : 'primary_text',
				},
			},
			inputs_by_content_type : {
				with_picture : [
					'tweet_body',
				],
				without_picture : [
					'tweet_body',
				],
			},
		},
		instagram : {
			inputs_for_content_bucket : {
				standard : 'instagram_caption',
			},
			input_types : {
				instagram_caption : {
					default_text : "The caption you would like to included with your instagram post",
					style_class : 'instagram-comment-input',
					input_category : 'primary_text',
				},
			},
			inputs_by_content_type : {
				standard : [
					'instagram_caption'
				],
			},
		},
		linked : {
			inputs_for_content_bucket : {
				picture_with_description : 'linked_description',
				picture_without_description : 'linked_body',
				without_picture : 'linked_description',
			},
			input_types : {
				linked_content_title : {
					default_text : "The title of the article that you would like to share",
					style_class : 'linked-title',
					input_category : 'title_of_external_link',
					
				},
				linked_description : {
					default_text : "Some thoughts on whatever content you're posting",
					style_class : 'linked-description',
					input_category : 'primary_text',
				},
				linked_body : {
					default_text : "This is where the main body of the text describing the link goes.  Feel free to really go sick here.  Just dive into the content in a way that really gets to the heart of things",
					style_class : 'description_of_external_link',
				},
				
			},
			inputs_by_content_type : {
				picture_with_description : [
					'linked_content_title',
					'linked_description',
					'linked_body',
				],
				picture_without_description : [
					'linked_content_title',
					'linked_body',
				],
				without_picture : [
					'linked_content_title',
					'linked_description',
				],
			},
		},
	},
	initializeClickableInputs : function() {
		
		var processedInputs = {};
		var currentItemContents = Session.get('current_item_contents');
	
		var networkType = Session.get('current_network_type');
		var contentType = Session.get('current_content_type');
		_.map(inputBuilder.inputMap[networkType]['inputs_by_content_type'][contentType], function(inputName){
			var input = inputBuilder.inputMap[networkType]['input_types'][inputName];
			var text = _.has(currentItemContents, inputName) ? currentItemContents[inputName] : input.default_text;
			input = inputBuilder.setTextInInput(text, input);
			input.id = inputName;
			var linkData = Session.get('current_facebook_link_data');
			input = inputBuilder.updateInputFromLinkData(input, linkData);
			input = inputBuilder.updateInputWithCopiedData(input);
			processedInputs[inputName] = input;
		});
		
		Session.set('clickable_inputs', processedInputs);
	},
	getInputNameForContentBucket: function(networkType, contentType){
		return this.inputMap[networkType]['inputs_for_content_bucket'][contentType];
	},
	setTextInInput : function(text, input) {
		input.text = text;
		input.display_text = input.text.replace(/\r?\n/g, '<br />');
		return input;
	},
	itemIsBeingCopied : function() {
		return !Session.equals('item_to_copy', null);	
	},
	updateInputWithCopiedData : function(input) {
		if(this.itemIsBeingCopied()) {
			var contentToCopy = this.getContentToCopyForInput(input);
			if(contentToCopy) {
				input = this.setTextInInput(contentToCopy, input);
			}
		}
		return input;
	},
	getContentToCopyForInput : function(input) {
		var itemToCopy = Session.get('item_to_copy');
		var inputCategory = input.input_category;
		var inputToCopy = this.getInputToCopyBasedOnCategory(inputCategory);
		
		// if there is a corresponding input to copy, return it, otherwise return false
		return inputToCopy ? itemToCopy['contents'][inputToCopy] : false;		
	},
	getInputToCopyBasedOnCategory : function(inputCategory) {
		var itemToCopy = Session.get('item_to_copy');
		var copiedNetworkType = itemToCopy.type;
		var copiedContentType = itemToCopy.content_type;
		inputsForCopiedItem = this.inputMap[copiedNetworkType]['inputs_by_content_type'][copiedContentType];
		
		return _.find(inputsForCopiedItem, function(inputName){
			var input = inputBuilder.inputMap[copiedNetworkType]['input_types'][inputName];
			return inputCategory == input.input_category;
		});
	},
	updateInputFromLinkData : function(input, linkData) {
		var newText = null;
		if(_.has(input, 'meta_tag')) {
			if(_.has(linkData, input.meta_tag)) {
				newText = linkData[input.meta_tag];
			} else {
				if (_.has(input, 'on_meta_tag_not_found')) {
					newText = input.on_meta_tag_not_found(linkData, input);
				}
			}
		}
		if(newText) {
			var input = this.setTextInInput(newText, input);
		}
		return input;
	},
	getClickableInputs : function() {
		return Session.get('clickable_inputs');
	},
	setEditStateForInput : function(input_id, isBeingEditted, text) {
		Session.set('edited_input_id', input_id);
		inputs = Session.get('clickable_inputs');
		inputs[input_id].being_editted = isBeingEditted;
		if(text != null && text != '') {
			this.handleChangesMade(text, inputs, input_id);
			inputs[input_id] = inputBuilder.setTextInInput(text, inputs[input_id]);
		}
		Session.set('clickable_inputs', inputs);
		Meteor.flush();
		var inputElement = '#' + input_id + '_input';
		$(inputElement).autosize();
		
	},
	handleChangesMade : function(text, inputs, input_id) {
		if(inputs[input_id].text != text && !Session.get('changes_made')) {
			Session.set('changes_made', true);
		}
	},
	cancelEditState : function(input_id) {
		inputBuilder.setEditStateForInput(input_id, false, null);
		Session.set('edited_input_id', null);
		Meteor.flush();
		var displayElement = '#' + input_id + '_display';
		$(displayElement).transition('shake', onHide = function(){
			Session.set('details_can_close', true);
		});
	},
	beingEditted : function(input_id) {
		inputs = Session.get('clickable_inputs');
		if(_.has(inputs, input_id)) {
			return _.has(inputs [input_id], 'being_editted') ? inputs[input_id]['being_editted'] : false;
		} else {
			return false;
		}
	},
	onInputClick : function(context) {
		var elementID = context.id;
		var inputElement = elementID + '_input';
		Session.set('details_can_close', false);
		inputBuilder.setEditStateForInput(elementID, true, null);
		Meteor.flush();	
		var element = document.getElementById(inputElement);
		element = $(element);
		element.attr('size', element.val().length);
		element.focus();
	},
	setLengthOfInputElement : function(elementID, inputElement) {
		if(inputBuilder.beingEditted(elementID)) {
			$(inputElement).attr('size', $(inputElement).val().length);
		}
	},
	onInputFocus : function() {
		keyStrokeHandler.setKeyMode('input', 'clickable_input');	
	},
	submitInputEdit : function(elementID, inputElement) {
			var displayElement = '#' + elementID + '_display';
			inputBuilder.setEditStateForInput(elementID, false, $(inputElement).val());
			Session.set('edited_input_id', null);
			// flush so that the element resets to its display form
			Meteor.flush();
			
			// trigger an animation so the user knows its been edited
			$(displayElement).transition('pulse', onHide = function(){
				keyStrokeHandler.setKeyMode('window', 'settings_window');
			});
	},
	onKeyPress : function(context) {
		this.handleContext(context, function(elementID, inputElement){
			console.log('getting called');
			inputBuilder.setLengthOfInputElement(elementID, inputElement);
		});
	},
	handleContext : function(context, useContext) {
		var elementID = context.id;
		var inputElement = '#' + elementID + '_input';
		return useContext(elementID, inputElement);
	},
	onShiftPress : function() {
		Session.set('shift_pressed', true);
	},
	onShiftRelease : function() {
		Session.set('shift_pressed', false);
	},
	onEnterPress : function(context) {
		this.handleContext(context, function(elementID, inputElement){
			if(inputBuilder.beingEditted(elementID) && !Session.get('shift_pressed')) {
				inputBuilder.submitInputEdit(elementID, inputElement);
			}
		});
	},
	onInputBlur : function(context) {
		var elementID = context.id;
		var inputElement = '#' + elementID + '_input';
		this.submitInputEdit(elementID, inputElement);
	},
	inputTextIsDefault : function(context) {
		return context.text == context.default_text
	}
};