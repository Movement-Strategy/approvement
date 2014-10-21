timeHandler = {
	getStartOfWeek : function() {
		var currentDays = Session.get('calendar_days');
		var startOfWeekTime = currentDays[0]['scheduled_time'];
		var dateString = moment(startOfWeekTime).format('DD-MM-YYYY');
		return moment(dateString, 'DD-MM-YYYY');
	},
	createMomentDate : function() {
		var dateObject = new Date().add;
		momentDate = moment();
		this.setCurrentTimestampFromDateObject(momentDate);
	},
	getCurrentWeek : function() {
		return moment(Session.get('time_stamp_for_current_date')).format('DD-MM-YYYY');
	},
	setCurrentTimestampFromDateObject : function(dateObject) {
		Session.set('timestamp_for_current_date', this.convertDateToTimestamp(momentDate));
	},
	convertDateToTimestamp : function(dateObject) {
		return dateObject.format('X') * 1000;
	},
	alterCurrentDate : function(alterFunction) {
		var startOfWeek = timeHandler.getStartOfWeek();
		startOfWeek = alterFunction(startOfWeek);
		momentDate = startOfWeek;
		this.setCurrentTimestampFromDateObject(momentDate);
	},
	changeToNextWeek : function() {
		timeHandler.alterCurrentDate(function(date){
			return date.add('days', 7);
		});
	},
	changeToTargetTime : function(targetTime) {
		timeHandler.alterCurrentDate(function(date){
			var currentTime = date.format('X') * 1000;
			var targetIsBeforeCurrent = targetTime > currentTime; 
			var daysBetween = moment.duration(Math.abs(currentTime - targetTime)).asDays();
			return targetIsBeforeCurrent ? date.add(daysBetween, 'days') : date.subtract(daysBetween, 'days')
		});
	},
	changeToLastWeek : function() {
		timeHandler.alterCurrentDate(function(date){
			return date.subtract('days', 7);
		});
	},
	debugTime : function(time, name) {
		console.log(name + moment(time).format('MMMM Do YYYY, h:mm:ss a'));
	},
	initializeTimePicker : function() {
		Meteor.defer(function(){
			$('#time-picker').timepicker();
			$('#time-picker').on('changeTime', function(){
				Session.set('time_to_post', $('#time-picker').val());
				Session.set('editing_time', false);
			});
		});	
	},
	isTimeSelected : function() {
		return !Session.get('editing_time');
	},
	getTimeToPost : function() {
		return Session.get('time_to_post');
	},
	pickerIsBeingEditted : function() {
		Session.set('editing_time', true);	
	},
	getFormattedDate : function(context) {
		return moment(context.created_time).format('MMMM Do YYYY, h:mm a');
	}
};