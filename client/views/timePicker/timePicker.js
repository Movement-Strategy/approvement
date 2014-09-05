Template['timePicker'].helpers({
	is_time_selected : function() {
		return !Session.get('editing_time');
	},
	time_to_post : function() {
		return Session.get('time_to_post');
	},
	initializePicker : function() {
		Meteor.defer(function(){
			$('#time-picker').timepicker();
			$('#time-picker').on('changeTime', function(){
				Session.set('time_to_post', $('#time-picker').val());
				Session.set('editing_time', false);
			});
		});	
	},
});

Template['timePicker'].events({
	'click .scheduled-time' : function() {
		Session.set('editing_time', true);
	}
});

