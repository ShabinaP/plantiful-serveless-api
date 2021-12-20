const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiKey = process.env.SENDGRID_API_KEY;
const sendgrid = require('@sendgrid/mail');

exports.handler = (event, context, callback) => {
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: "jeilani@gmail.com",
    from: "info@eastberry.io",
    subject: "test",
    text: "test",
};
sendgrid.send(msg);
callback(null, 'Message Sent');
}
