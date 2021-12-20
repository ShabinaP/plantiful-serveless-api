const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const dbConnection = require('../dbConfigs');
const ProductService = require('../Services/product');
app.use(cors());
app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  base url to test our API
app.get('/health', async (req, res) => {
   await res.send("<h3>Welcome to the Product API for Plantiful Plant care!!</h3>")
})

//  function for creating a new product
app.post('/plant/add', async (req, res) => {
  try {
   await dbConnection();
   const data  = req.body;
   const {plantId,
          latinName,
          familyName,
          humidity,
          watering,
          toxicity,
          temperature,
          airPurifyer,
          childPetSafe,
          origin,
          username,
          likes,
          likedBy,
          dislikes, 
          dislikedBy
          } = data;
 if(!data) {
     return "Please pass all required fields!"
  }
   const dataToSave = {
          plantId,
          latinName,
          familyName,
          humidity,
          watering,
          toxicity,
          temperature,
          airPurifyer,
          childPetSafe,
          origin,
          username,
          likes,
          likedBy,
          dislikes,
          dislikedBy
   };
   let createPlant=  await ProductService.createPlant(dataToSave);
   if (createPlant) {
     return res.status(200).send(
       createProduct
    )
   }
  } catch (error) {
    //  handle errors here
    console.log(error, "error!!");
  }
})

//  function for getting all products
app.get('/plants', async (req, res) => {
try {
    await dbConnection();
    const allProducts = await ProductService.getAllPlants();
    if (allProducts) {
      return res.status(200).send({
        data: allProducts
      })
    }
  } catch (error) {
     //  handle errors here
     console.log(error, "error!!");
  }
})


//  function for getting a  product by Id
app.get('/plant/:productId/', async (req, res) => {
  try {
    await dbConnection();
    const {productId} = req.params;
    const getPlant = await ProductService.getPlantByName({productId});
    if(getPlant) {
      return res.status(200).send({
        data: getPlant
      })
    }
  } catch (error) {
     //  handle errors here
     console.log(error, "error!!");
  }
});


app.post('/auth/register', async (req, res) => {
  try {
   await dbConnection();
   const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const username = req.body.username
  const email = req.body.email
  const data = {
    password,
    username,
    email,
  }
 if(!data) {
     return "Please pass all required fields!"
  }
   const userData = {
    password,
    username,
    email,
   };
   let createUser=  await ProductService.createUser(userData);
   if (createUser) {
     return res.status(200).send(
       createUser
    )
   }
  } catch (error) {
    //  handle errors here
    console.log(error, "error!!");
  }
})

module.exports.handler = serverless(app);