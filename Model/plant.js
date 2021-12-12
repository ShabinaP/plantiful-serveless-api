const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const PlantSchema = new mongoose.Schema(
  {
    plantId: {type: String, required: true,
    unique: true,},
    latinName: {type: String},
    familyName: {type: String},
    humidity: {type: String},
    watering: {type: String},
    toxicity: {type: String},
    temperature: {type: Number},
    airPurifyer: {type: String},
    childPetSafe: {type: String},
    origin: {type: String},
    username: {type: String},
    likes: { type: Number, default: 0 },
    likedBy: { type: Array },
    dislikes: { type: Number, default: 0 },
    dislikedBy: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plant", PlantSchema);