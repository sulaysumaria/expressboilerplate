const sgMail = require('@sendgrid/mail');

const {SENDGRID_API_KEY} = require('./../config');

sgMail.setApiKey(SENDGRID_API_KEY);

module.exports.sendMail = async ({to, subject, body}) => {
  return new Promise((resolve) => {
    const mail = {
      from: config.noReplyEmail,
      to,
      subject,
      html: body,
    };

    sgMail.send(mail);

    return resolve();
  });
};
