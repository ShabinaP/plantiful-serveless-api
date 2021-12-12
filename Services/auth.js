const User = require('../Model/User');
const { getUserPlants } = require('./plants');
const data = require('./auth')
module.exports = {
async createUser (user) {
  let result = await User.create(user);
  if(result) {
    return {
      data: user,
      message: "user successfully created!"
};
  }
return "Error creating new user"
},
async getUser(userid) {
  const user = await User.findById(userid);
  const {password, ...others} = user._doc

  console.log(others);
  if(user) {
    return  others
  } else{
    return "Could not find user"
  }

},
 async updatedUser(userid, updateField) {
   const updatedUser = await User.findByIdAndUpdate( userid,{$set :updateField }, {new: true}   )
   if(updatedUser) {
     return updatedUser
   }
   return "Error updating user"
 },

 async deletedUser(userid) {
   const deleteUser = await User.findByIdAndDelete( userid)
   if(deleteUser) {
     return {
       
      data: deleteUser,
      message: "user successfully deleted"
    
    }
   }
   return "Error deleting  user"
 },
async userLogin()


};


