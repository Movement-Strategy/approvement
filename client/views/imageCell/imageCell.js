Template['imageCell'].helpers({
	show_image : function() {
		return this.value != null;
	},
	is_loading : function() {
		return this.content_bucket_id == Session.get('loading_bucket_id');
	}
});

Template['imageCell'].events({
});

