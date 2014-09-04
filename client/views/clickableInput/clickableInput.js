setEditStateForInput = function(input_id, isBeingEditted, text) {
	inputs = Session.get('clickable_inputs');
	inputs[input_id].being_editted = isBeingEditted;
	if(text != null && text != '') {
		inputs[input_id].text = text;
	}
	Session.set('clickable_inputs', inputs);
};

cancelEditState = function(input_id) {
	setEditStateForInput(input_id, false, null);
	Meteor.flush();
	var displayElement = '#' + input_id + '_display';
	$(displayElement).transition('shake', onHide = function(){
		Session.set('details_can_close', true);
	});
}

beingEditted = function(input_id) {
	inputs = Session.get('clickable_inputs');
	return _.has(inputs [input_id], 'being_editted') ? inputs[input_id]['being_editted'] : false;
}

Template['clickableInput'].helpers({
	being_editted : function() {
		return beingEditted(this.id);
	},
	text_to_display : function() {
		return this.text == this.default_text ? "" : this.text;
	}
});

Template['clickableInput'].events({
	'click'  : function(event) {
		var inputElement = this.id + '_input';
		Session.set('details_can_close', false);
		setEditStateForInput(this.id, true, null);
		Meteor.flush();	
		var element = document.getElementById(inputElement);
		element = $(element);
		element.attr('size', element.val().length);
		element.focus();
	
	},
	'keydown' : function() {
		var inputElement = '#' + this.id + '_input';
		if(beingEditted(this.id)) {
			$(inputElement).attr('size', $(inputElement).val().length);
		}
		if(beingEditted(this.id) && event.which == 13) {
			var displayElement = '#' + this.id + '_display';
			setEditStateForInput(this.id, false, $(inputElement).val());
			Meteor.flush();
			$(displayElement).transition('pulse', onHide = function(){
				Session.set('details_can_close', true);
			});
		}
		if(beingEditted(this.id) && event.which == 27) {
			cancelEditState(this.id);
		}
	},
	'blur .input-text' : function(event) {
		cancelEditState(this.id);
	},
	
});

