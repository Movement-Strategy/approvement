Template['defaultHeader'].helpers({
	show_dropdown : function() {
		return !Session.get('details_shown');
	}
});

Template['defaultHeader'].events({
});

