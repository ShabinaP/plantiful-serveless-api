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


module.exports = mongoose.model("User", UserSchema);