Template['clientNameCell'].helpers({
	cell_class : function() {
		return this.disabled ? 'disabled' : ''; 
	},
});

Template['clientNameCell'].events({
	'click' : function() {
		clientOverviewHandler.onCellClick(this);
	},
});

