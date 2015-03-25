timeHandler = {
	getShiftedTimestamp : function(timestamp) {
		var dateObject = moment(timestamp);
		var hour = dateObject.hour();
		var shiftForward = hour > 12;
		if(hour != 0) {
			var updatedObject = shiftForward ? dateObject.add(24 - hour, 'hours') : dateObject.subtract(hour, 'hours');
			timestamp = this.dateObjectToTimestamp(updatedObject);
		}		
		return timestamp;
	},
	timeStampIsInWeek : function(timestamp, weekString) {
		var weekForTimestamp = timeHandler.timestampToStartOfWeekDateString(timestamp);
		return weekString == weekForTimestamp;
	},
	getDayDescription : function() {
		var dateMap = {
			1 : 'Monday',
			2 : 'Tuesday',
			3 : 'Wednesday',
			4 : 'Thursday',
			5 : 'Friday',
			6 : 'Saturday',
			7 : 'Sunday',
		};
		var currentDay = Session.get('current_day');
		if(currentDay) {
			var date = moment(moment(currentDay['scheduled_time']));
			var dateString = date.format('MM/DD/YYYY');
			return dateMap[date.isoWeekday()] + " " + dateString;
		} else {
			return "";
		}
	},
	getTimestampForCurrentDate : function() {
		return Session.get('time_stamp_for_current_date');	
	},
	dateStringToObject : function(dateString) {
		return moment(dateString, 'MM-DD-YYYY');
	},
	dateObjectToTimestamp : function(dateObject) {
		return dateObject.format('X') * 1000;
	},
	dateStringToTimestamp : function(dateString) {
		var dateObject = this.dateStringToObject(dateString);
		var timestamp = this.dateObjectToTimestamp(dateObject);
		return timestamp;
	},
	timestampToStartOfWeekDateString : function(timestamp) {
		var startOfWeekTimestamp = this.timestampToStartOfWeekTimestamp(timestamp);
		return this.timestampToDateString(startOfWeekTimestamp);
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
		return dateObject.format('MM-DD-YYYY');	
	},
	dateStringToStartOfWeekTimestamp : function(dateString) {
		var startOfWeekObject = this.dateStringToStartOfWeekDateObject(dateString);
		return this.dateObjectToTimestamp(startOfWeekObject);	
	},
	getCurrentDateObject : function() {
		return moment(Session.get('time_stamp_for_current_date'));	
	},
	getStartOfWeek : function() {
		return this.convertDateObjectToStartOfWeek(moment());
	},
	getCurrentWeek : function() {
		return this.getStartOfWeek().format('MM-DD-YYYY');
	},
	setCurrentTimestampFromDateObject : function(dateObject) {
		Session.set('time_stamp_for_current_date', this.convertDateToTimestamp(momentDate));
	},
	convertDateToTimestamp : function(dateObject) {
		return dateObject.format('X') * 1000;
	},
	getDateStringForStartOfThisWeek : function() {
		var currentDateObject = moment();
		var startOfWeekObject = this.convertDateObjectToStartOfWeek(currentDateObject);
		var dateString = this.dateObjectToDateString(startOfWeekObject);
		return dateString;
	},
	getWeekForSelectedTime : function() {
		var dateString = this.timestampToDateString(Session.get('time_stamp_for_current_date'));
		var startOfWeekObject = this.dateStringToStartOfWeekDateObject(dateString);
		dateString = this.dateObjectToDateString(startOfWeekObject);
		return dateString;
	},
	alterCurrentDate : function(alterFunction) {
		var currentDateObject = this.getCurrentDateObject();
		startOfWeek = this.convertDateObjectToStartOfWeek(currentDateObject);
		updatedDate = alterFunction(startOfWeek);
		newWeekID = this.dateObjectToDateString(updatedDate);
		var clientID = clientHandler.getSelectedClientID();
		navHandler.go(navHandler.getCurrentRoute(), {client_id : clientID, week_id : newWeekID});
	},
	changeToNextWeek : function() {
		timeHandler.alterCurrentDate(function(date){
			return date.add(7, 'days');
		});
	},
	getTimestampForDayIndexOfCurrentWeek : function(dayIndex) {
		var currentTimestamp = Session.get('time_stamp_for_current_date');
		var dateObject = moment(currentTimestamp);
		var updatedDateObject = dateObject.isoWeekday(dayIndex);
		return this.dateObjectToTimestamp(updatedDateObject);
	},
	changeToTargetTime : function(targetTime) {
		timeHandler.alterCurrentDate(function(date){
			return timeHandler.convertDateObjectToStartOfWeek(date);
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
			return date.subtract(7, 'days');
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