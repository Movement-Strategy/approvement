timeHandler = {
	getStartOfWeek : function() {
		var currentDays = Session.get('current_days');
		var startOfWeekTime = currentDays[0]['scheduled_time'];
		var dateString = moment(startOfWeekTime).format('DD-MM-YYYY');
		return moment(dateString, 'DD-MM-YYYY');
	}
};