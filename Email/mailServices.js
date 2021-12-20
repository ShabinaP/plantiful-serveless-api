const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiKey = process.env.SENDGRID_API_KEY;
const sendgrid = require('@sendgrid/mail');
const axios = require('axios')

exports.handler = async () => {
 const data = await axios.get(``)
 const response = await data.data.data
 const plantDetails = await response.map((plantDetail) => {
   return   axios.post("", {
         recipient: plantDetail.userEmail,
         message: {
          subject: plantDetail.plantName,
         text: `its that of the week, you need to water plant ${plantDetail.plantName}`
            }
        })
    })
    await Promise.all(plantDetails)
    console.log('function invoked',response)

}
