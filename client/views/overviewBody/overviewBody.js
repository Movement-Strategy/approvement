Template['overviewBody'].helpers({
	overview_rows : function() {
		rows = customClientHandler.getCustomOverviewRows();
		console.log(rows);
		return rows;
	},
});

Template['overviewBody'].events({
});

