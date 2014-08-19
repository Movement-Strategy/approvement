Meteor.publish("userData", function(){
  return Meteor.users.find(
    {_id: this.userId},
    {fields: {'_id' : 1, 'profile': 1, 'user_type': 1}}
  );
});