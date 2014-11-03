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
	});
} else {
	Meteor.methods({
		updateContentBucket : function(id, query){
			ContentBucket.update(id, query);
		}, 
	});
}