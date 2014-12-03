Meteor.subscribe('content_bucket', onReady = function(){
	Session.set('content_buckets_ready', true);
})


