setEditStateForInput = function(input_id, isBeingEditted, text) {
	inputs = Session.get('clickable_inputs');
	inputs[input_id].being_editted = isBeingEditted;
	if(text != null && text != '') {
		inputs[input_id].text = text;
	}
	Session.set('clickable_inputs', inputs);
};

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
		setEditStateForInput(this.id, true, null);
		Meteor.flush();	
		document.getElementById(inputElement).focus();
	},
	'keydown' : function() {
		if(beingEditted(this.id) && event.which == 13) {
			var inputElement = '#' + this.id + '_input';
			var displayElement = '#' + this.id + '_display';
			setEditStateForInput(this.id, false, $(inputElement).val());
			Meteor.flush();
			$(displayElement).transition('pulse');
		}
	},
	'blur .input-text' : function(event) {
		var displayElement = '#' + this.id + '_display';
		setEditStateForInput(this.id, false, event.target.value);
		Meteor.flush();
		$(displayElement).transition('pulse');
	},
	
});

