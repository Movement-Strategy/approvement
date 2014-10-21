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
		return this.getStartOfWeek().format('DD-MM-YYYY');
	},
	setCurrentTimestampFromDateObject : function(dateObject) {
		Session.set('timestamp_for_current_date', this.convertDateToTimestamp(momentDate));
	},
	convertDateToTimestamp : function(dateObject) {
		return dateObject.format('X') * 1000;
	},
	alterCurrentDate : function(alterFunction) {
		var startOfWeek = timeHandler.getStartOfWeek();
		updatedDate = alterFunction(startOfWeek);
		momentDate = updatedDate;
		Router.go('/client/' + Session.get('selected_client_id') + '/week/' + updatedDate.format('DD-MM-YYYY'));
	},
	changeToNextWeek : function() {
		timeHandler.alterCurrentDate(function(date){
			return date.add('days', 7);
		});
	},
	changeToTargetTime : function(targetTime) {
		timeHandler.alterCurrentDate(function(date){
			return timeHandler.getDateObjectForBeginningOfWeek(targetTime, date);
		});
	},
	getDateObjectForBeginningOfWeek : function(targetTime, currentDateObject) {
		var currentTime = currentDateObject.format('X') * 1000;
		var targetIsBeforeCurrent = targetTime > currentTime; 
		var daysBetween = moment.duration(Math.abs(currentTime - targetTime)).asDays();
		return targetIsBeforeCurrent ? currentDateObject.add(daysBetween, 'days') : currentDateObject.subtract(daysBetween, 'days');
	},
	setCurrentTimeStampFromDateString : function(dateString) {
		var dateObject = moment();
		var targetTime = moment(dateString, 'DD-MM-YYYY').format('X') * 1000;
		var beginningOfWeek = timeHandler.getDateObjectForBeginningOfWeek(targetTime, dateObject);
		Session.set('timestamp_for_current_date', beginningOfWeek.format('X') * 1000);
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