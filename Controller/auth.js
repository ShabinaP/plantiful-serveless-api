const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const dbConnection = require('../dbConfigs');
const userServices = require('../Services/auth');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//  function for creating a new user
app.post('/auth/register', async (req, res) => {
  try {
   await dbConnection();
  const salt = await bcrypt.genSalt(10);
  const {username,password,email,name} = req.body;
  const encryptedPassword = await bcrypt.hash(password, salt);
  console.log(username)
  const data = {
    username,
    email,
    name,
    password: encryptedPassword
  }
 if(!data) {
     return "Please pass all required fields!"
  }
  
   let createUser=  await userServices.createUser(data);
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


app.get('/auth/:id', async (req, res) => {
   try {
     await dbConnection();
     const userid = req.params.id
     const getUser = await userServices.getUser(userid)
     if(getUser){
       return res.status(200).send(getUser)
      
     }
     
   } catch (error) {
     
   }
})

app.put('/auth/update/:id', async (req, res)=>{
  if(req.body.userid===req.params.id){
    if(req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
  
  try {
    await dbConnection();
    const userid = req.params.id
    const updateField = req.body
    const updatedUSer = await userServices.updatedUser(userid, updateField)
    
    if(updatedUSer){
      return res.status(200).send(updatedUSer)
    }
  } catch (error) {
    console.log(error)
  }
}
})
app.delete('/auth/delete/:id', async (req, res)=>{
  if(req.body.userid===req.params.id){
    try {
    await dbConnection();
    const userid = req.params.id
    const deletedtedUSer = await userServices.deletedUser(userid)
    
    if(deletedtedUSer){
      return res.status(200).send(deletedtedUSer)
    }
  } catch (error) {
    console.log(error)
  }
}
return res.status(401).json("Not allowed")
})








//  function for getting all products
// app.get('/plants', async (req, res) => {
// try {
//     await dbConnection();
//     const allProducts = await ProductService.getAllPlants();
//     if (allProducts) {
//       return res.status(200).send({
//         data: allProducts
//       })
//     }
//   } catch (error) {
//      //  handle errors here
//      console.log(error, "error!!");
//   }
// })


// //  function for getting a  product by Id
// app.get('/plant/:latinName/', async (req, res) => {
//   try {
//     await dbConnection();
//     const {latinName} = req.params;
//     const getPlant = await ProductService.getPlantByName({latinName});
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

module.exports.handler = serverless(app);