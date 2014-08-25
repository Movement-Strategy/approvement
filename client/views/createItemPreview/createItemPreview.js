Template['createItemPreview'].helpers({
	image_url : function() {
		currentItemContents = Session.get('current_item_contents');
		currentURL = _.has(currentItemContents, 'image_url') ? currentItemContents['image_url'] : "http://lorempixel.com/476/246/";
		return Session.get('uploaded_image_url') == null ? currentURL : Session.get('uploaded_image_url');
	},
	profile_pic_url : function() {
		return Session.get('selected_client').profile_pictures.facebook;
	},
	display_name : function() {
		return Session.get('selected_client').display_name;
	}
});

Template['createItemPreview'].events({
});

