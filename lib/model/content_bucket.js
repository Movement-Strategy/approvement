ContentBucket = new Meteor.Collection('content_bucket');

// Collection2 already does schema checking
// Add custom permission rules if needed
ContentBucket.allow({
    insert : function () {
        return true;
    },
    update : function () {
        return true;
    },
    remove : function () {
        return true;
    }
});

if(Meteor.isServer) {
	Meteor.methods({
		updateContentBucket : function(id, query){
			ContentBucket.update(id, query);
		}, 
		removeAllContentBuckets : function() {
			ContentBucket.remove({});
		},
		insertTestRecord : function() {
			var testRecord = {
				description : "Throwback Thursday",
				repeats : true,
				week : '11-03-2014',
				client_id : 'usa_today',
			};
			ContentBucket.insert(testRecord);
		}
	});
} else {
	Meteor.methods({
		updateContentBucket : function(id, query){
			ContentBucket.update(id, query);
		},
	});
}