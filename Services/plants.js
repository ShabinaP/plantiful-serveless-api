const Plant = require('../Model/plant');
const User = require('../Model/User');

module.exports = {
  //add plant into user plants
  async pushPlantToUser(userId, plantId) {
    let user = await User.findById(userId);
    if (!user.userPlants.includes(plantId)) {
      user.userPlants.push(plantId)
      user.save()
      return "Plant added successfully"
    } else {
      return `you already have this plant`
    }

  },
  async getAllPlants() {

    let plant = await Plant.find();
    if (plant) return plant;
    return "Error fetching products from db"
  },

  // async getPlantByName(productId)  {
  //   let plant = await Plant.findOne(productId);
  //   if(plant) return plant;
  //   return "Error fetching product from db";
  // },
  async getPlantByName(plantname) {
    let plant = await Plant.find({
      latinName: plantname

    });
    if (plant) return plant;
    return "Error fetching product from db";
  },
  async getUserPlants(_id) {
    let plant = await User.find({
      _id: _id
    }).populate('userPlants')
    if (plant) return plant;
    return "Error fetching plant from db";
  },
  async deleteUserPlant(userid, plantId) {
    const userplant = User.updateOne({
      _id: userid
    }, {
      $pullAll: {
        userPlants: [plantId]
      }

    })
    if (userplant) return userplant;
    return "Plant not found";

  },






};