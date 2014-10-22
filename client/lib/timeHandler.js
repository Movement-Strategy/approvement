timeHandler = {
	getTimestampForCurrentDate : function() {
		return Session.get('time_stamp_for_current_date');	
	},
	dateStringToObject : function(dateString) {
		return moment(dateString, 'DD-MM-YYYY');
	},
	dateObjectToTimestamp : function(dateObject) {
		return dateObject.format('X') * 1000;
	},
	dateStringToTimestamp : function(dateString) {
		var dateObject = this.dateStringToObject(dateString);
		var timestamp = this.dateObjectToTimestamp(dateObject);
		return timestamp;
	},
	timestampToStartOfWeekTimestamp : function(timestamp) {
		var dateString = this.timestampToDateString(timestamp);
		return this.dateStringToStartOfWeekTimestamp(dateString);
	},
	timestampToDateString : function(timestamp) {
		var dateObject = moment(timestamp);
		return this.dateObjectToDateString(dateObject);
	},
	setCurrentTimestampFromScheduledTime : function(scheduledTime) {
		Session.set('timestamp_for_current_date', this.timestampToStartOfWeekTimestamp(scheduledTime));	
	},
	dateStringToStartOfWeekDateObject : function(dateString) {
		var dateObject = this.dateStringToObject(dateString);
		var startOfWeekObject = this.convertDateObjectToStartOfWeek(dateObject);
		return startOfWeekObject;
	},
	convertDateObjectToStartOfWeek : function(dateObject) {
		var startOfWeekObject = dateObject.isoWeekday(1);
		return startOfWeekObject;
	},
	dateObjectToDateString : function(dateObject) {
		return dateObject.format('DD-MM-YYYY');	
	},
	dateStringToStartOfWeekTimestamp : function(dateString) {
		var startOfWeekObject = this.dateStringToStartOfWeekDateObject(dateString);
		return this.dateObjectToTimestamp(startOfWeekObject);	
	},
	getStartOfWeek : function() {
		return this.convertDateObjectToStartOfWeek(moment());
	},
	createMomentDate : function() {
		var dateObject = new Date().add;
		momentDate = moment();
	},
	getCurrentWeek : function() {
		return this.getStartOfWeek().format('DD-MM-YYYY');
	},
	setCurrentTimestampFromDateObject : function(dateObject) {
		Session.set('time_stamp_for_current_date', this.convertDateToTimestamp(momentDate));
	},
	convertDateToTimestamp : function(dateObject) {
		return dateObject.format('X') * 1000;
	},
	alterCurrentDate : function(alterFunction) {
		startOfWeek = this.convertDateObjectToStartOfWeek(momentDate);
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
	setCurrentTimestampToStartOfWeekForDateString : function(dateString) {
		Session.set('time_stamp_for_current_date', this.dateStringToStartOfWeekTimestamp(dateString));
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