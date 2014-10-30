draftBoardHandler = {
	getColumnMap : function() {
		return {
			content_bucket : {
				display : "Content Bucket",
			},
			content : {
				display : "Content"
			},
/*
			network : {
				display : "Network"
			},
*/
/*
			content_type : {
				display : "Content Type"
			},
			day_of_week : {
				display : "Day of week"
			},
			scheduled_time : {
				display : "Scheduled Time"
			},
			reference : {
				display : "Reference"
			},
*/
		};	
	},
	isShown : function() {
		return Session.get('draft_board_is_shown');	
	},
	getColumns : function() {
		var columns =  _.map(this.getColumnMap(), function(column, columnID){
			return column;
		});
		return columns;
	},
	getContentBuckets : function() {
		return [
			{
				columns : [
					{
						
					},
				],
			},
		],
	},
};