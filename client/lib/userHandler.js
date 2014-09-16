userHandler = {
	userIsType : function(typeToCheck) {
		return Session.get('user_type') == typeToCheck;
	}
};