const emailConfig = require('../utils/email-config')();
const mailgun = require('mailgun-js')(emailConfig);
exports.sendEmail = (recipient, message) =>
  new Promise((resolve, reject) => {
    const data = {
      from: 'Plantiful Notification <proccess.env.sender>',
      to: recipient,
      subject: message.subject,
      text: message.text,
    };

    mailgun.messages().send(data, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
});