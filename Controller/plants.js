const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const dbConnection = require('../dbConfigs');
const plantServices = require('../Services/plants');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  base url to test our API
app.get('/health/', async (req, res) => {
   await res.send("<h3>Welcome to the Product API for Plantiful Plant care!!</h3>")
})

// push plant into user plants array
//adding plant into user plants collection 
app.put('/plant/add/', async (req, res) => {
  try {
   await dbConnection();

   const userId = req.body.userId
   const plantId = req.body.plantId

   let user=  await plantServices.pushPlantToUser(userId, plantId);
 
   if (user) {
     return res.status(200).send({
        user
     }
      
    )
   }
  } catch (error) {
    //  handle errors here
    console.log(error, "error!!");
  }
})

//  function for getting all plants
app.get('/plants/', async (req, res) => {
try {
    await dbConnection();
    const allPlants = await plantServices.getAllPlants();
    if (allPlants) {
      return res.status(200).send({
        data: allPlants
      })
    }
  } catch (error) {
     //  handle errors here
     console.log(error, "error!!");
  }
})

//search plant by familyName/ can add more search params  

app.get('/plant/:plantname', async (req, res) => {

   try {
      await dbConnection();
      const request = req.params.plantname
      console.log(request)
       const plantname = new RegExp(request, "i");
      console.log(request)
      const plant = await plantServices.getPlantByName(plantname);
      if(plant){
         return res.status(200).send({
            data: plant
         })
      }
   


   } catch (error) {
      
   }
})


//get all plants for one particular user (works)  
 // fetches user plants from dataase using userPlant array 
 // this same method can be used to fetch user wish list from database
app.get('/plants/:userplants', async (req, res)=>{
   await dbConnection();

   const request = req.params.id
   const _id = request
   const userPlants = await plantServices.getUserPlants(_id);
   if(userPlants){
      return res.status(200).send({
         data: userPlants
      })
   }

})
app.put('/plants/delete/:userplant/', async (req, res)=>{
 try {
   await dbConnection();
   const userid = req.body.userid
   const plantId = req.body.plantid
   const deleteUserPlant = await plantServices.deleteUserPlant(userid, plantId)
   if(deleteUserPlant){
      return res.status(200).send({
         data: deleteUserPlant
      })
   }
 } catch (error) {
    res.status(500).send({
       error: error.message
    })
    
 }
})






// //  function for getting a  product by Id
// app.get('/plant/:productId/', async (req, res) => {
//   try {
//     await dbConnection();
//     const {productId} = req.params;
//     const getPlant = await ProductService.getPlantByName({productId});
//     if(getPlant) {
//       return res.status(200).send({
//         data: getPlant
//       })
//     }
//   } catch (error) {
//      //  handle errors here
//      console.log(error, "error!!");
//   }
// });


// app.post('/auth/register', async (req, res) => {
//   try {
//    await dbConnection();
//    const salt = await bcrypt.genSalt(10);
//   const password = await bcrypt.hash(req.body.password, salt);
//   const username = req.body.username
//   const email = req.body.email
//   const data = {
//     password,
//     username,
//     email,
//   }
//  if(!data) {
//      return "Please pass all required fields!"
//   }
//    const userData = {
//     password,
//     username,
//     email,
//    };
//    let createUser=  await ProductService.createUser(userData);
//    if (createUser) {
//      return res.status(200).send(
//        createUser
//     )
//    }
//   } catch (error) {
//     //  handle errors here
//     console.log(error, "error!!");
//   }
// })

module.exports.handler = serverless(app);