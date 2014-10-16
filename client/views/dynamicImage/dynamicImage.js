Template['dynamicImage'].helpers({
});

Template['dynamicImage'].events({
	'click .image-click-target' : function() {
		$('#image_input').click();
	},
	'change #image_input' : function(event) {
		imageUploadHandler.onFileChange(event);
	}
});

