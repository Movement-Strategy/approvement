Meteor.publish('approval_items_for_this_user', function (userID, userType) {
    if(userType != 'art_director') {
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
    } else {
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
			    	status : 'creative_needed',
		    	},
		    ],
	    };
    }
    return ApprovalItem.find(query);
});

