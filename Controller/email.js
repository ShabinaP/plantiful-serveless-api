const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const dbConnection = require('../dbConfigs');
const emailServices = require('../Services/email');
app.use(bodyParser.json());
const genWebToken = require('../Services/genwebToken')
const cors = require('cors');
const emailUtil = require('../Services/email');
const { sendEmail } = emailUtil;
app.use(cors());
app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/mail/send', async (req, res, next) => {
    const { recipient, message } = req.body;
    try {
        await sendEmail(recipient, message);
        res.json({message: 'you message has been sent'});
        await next();
       } catch (e) {
        await next(e);
     }
   });



module.exports.handler = serverless(app);