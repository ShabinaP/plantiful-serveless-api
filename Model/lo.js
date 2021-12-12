const mongoose = require("mongoose");
const PlanttSchema = new mongoose.Schema (
   {
    plantId: {type: String},
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

const ProductModel = mongoose.model("plant", PlantSchema);
module.exports = ProductModel;



