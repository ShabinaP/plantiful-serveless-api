const Plant = require('../Model/plant');
const User = require('../Model/User');

module.exports = {
async createPlant (plant) {
  let result = await Plant.create(plant);
  if(result) {
    return {
      data: plant,
      message: "plant successfully created!"
};
  }
return "Error creating new product"
},

async getAllPlants()  {
  let plant = await Plant.find();
  if(plant)  return plant;
  return "Error fetching products from db"
},

async getPlantByName(productId)  {
  let plant = await Plant.findOne(productId);
  if(plant) return plant;
  return "Error fetching product from db";
},


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



};