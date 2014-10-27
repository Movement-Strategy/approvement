Meteor.publish('approval_items_for_this_user', function (userID) {
    var query = {
	    $or : [
	    	{
		    	scope : {
			    	$in : [
			    		'internal',
			    		'external',
			    	],
		    	}
	    	},
	    	{
		    	scope : 'private',
		    	created_by : userID,
	    	},
	    ],
    };
    return ApprovalItem.find(query);
});

