Meteor.publish('approval_items_for_this_user', function (userID, userType) {
    var query = {};
    if(userType != 'art_director') {
	   if(userType != 'social_media_manager') {
		   	query = {
		    	scope : {
			    	$in : [
			    		'internal',
			    		'external',
			    	],
		    	}
			};
	   }
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
			    	status : {
				    	$in : [
				    		'creative_needed',
				    		'creative_updated',
				    	],
			    	},
		    	},
		    ],
	    };
    }
    return ApprovalItem.find(query);
});

