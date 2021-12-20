const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const dbConnection = require('../dbConfigs');
const plantServices = require('../Services/plants');
const cors = require('cors');
app.use(cors());
app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

//  base url to test our API
app.get('/health/', async (req, res) => {
   const response = {
      statusCode: 200,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
         message: "succefull landing"
      }),
   };
   res.sendStatus(200)

})

// push plant into user plants array
//adding plant into user plants collection 
app.put('/plant/add/', async (req, res) => {
   try {
      await dbConnection();

      const userId = req.body.userId
      const plantId = req.body.plantId

      let user = await plantServices.pushPlantToUser(userId, plantId);

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
      return {

         headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            "Accept": "*/*",
            "Content-Type": "application/json"
         } ,        
         response: res.status(200).send(allPlants),
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
      if (plant) {
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
app.get('/plants/:userplants', async (req, res) => {
   await dbConnection();

   const request = req.params.id
   const _id = request
   const userPlants = await plantServices.getUserPlants(_id);
   if (userPlants) {
      return res.status(200).send({
         data: userPlants
      })
   }

})
app.put('/plants/delete/:userplant/', async (req, res) => {
   try {
      await dbConnection();
      const userid = req.body.userid
      const plantId = req.body.plantid
      const deleteUserPlant = await plantServices.deleteUserPlant(userid, plantId)
      if (deleteUserPlant) {
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








module.exports.handler = serverless(app);