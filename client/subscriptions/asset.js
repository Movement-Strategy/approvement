Deps.autorun(function(){
	if(Session.get('selected_client_id') != null) {
		Meteor.subscribe('asset', Session.get('selected_client_id'));
	}
});


