inputBuilder = {
	inputMap : {
		facebook : {
			input_types : {
				description : {
					default_text : 'Choose some text for the post',
					style_class : '',
				},
				link_body : {
					default_text : 'Title Included with Link',
					style_class : 'link-title',
				},
				link_text : {
					default_text : 'Detailed Link Description',
					style_class : 'link-text',
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
			input_types : {
				tweet_body : {
					default_text : "Choose some text for your tweet",
					style_class : 'twitter-body',
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
			input_types : {
				instagram_caption : {
					default_text : "The caption you would like to included with your instagram post",
					style_class : '',
				},
			},
			inputs_by_content_type : {
				standard : [
					'instagram_caption'
				],
			},
		},
		linked : {
			input_types : {
				linked_content_title : {
					default_text : "The title of the article that you would like to share",
					style_class : 'linked-title',
				},
				linked_description : {
					default_text : "Describe your content here",
					style_class : 'linked-description',
				},
			},
			inputs_by_content_type : {
				with_picture : [
					'linked_content_title',
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
			input.text = _.has(currentItemContents, inputName) ? currentItemContents[inputName] : input.default_text;
			input.id = inputName;
			processedInputs[inputName] = input;
		});
		
		Session.set('clickable_inputs', processedInputs);
	},
};