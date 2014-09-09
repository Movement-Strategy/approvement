Asset = new Meteor.Collection('asset');

// Collection2 already does schema checking
// Add custom permission rules if needed
Asset.allow({
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
		createOrUpdateAsset : function(newAsset){
			Asset.upsert(newAsset.id, newAsset);
		},
	});
}

