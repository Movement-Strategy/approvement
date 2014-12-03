Meteor.subscribe('draft_item', onReady = function(){
 	Session.set('draft_items_ready', true);
});


