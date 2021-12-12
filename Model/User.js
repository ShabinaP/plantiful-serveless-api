const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      required:false,
    },
    userPlants:[{ type: Schema.Types.ObjectId, ref: "Plant"}],

  },
  { timestamps: true }
);

//for login to decrty the password or user update the password
UserSchema.methods.compareUSerPassword = async function(userPassword) {
  return await bcrypt.compare(userPassword, this.password)
}

// checks if password is encrypted, if not encrypts password
// ti
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
module.exports = mongoose.model("User", UserSchema);