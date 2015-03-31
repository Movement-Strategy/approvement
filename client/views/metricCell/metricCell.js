Template['metricCell'].helpers({
	show_value : function() {
		if(_.has(this, 'show_value')) {
			return this.show_value;
		} else {
			return true;
		}
	},
});

Template['metricCell'].events({
});

