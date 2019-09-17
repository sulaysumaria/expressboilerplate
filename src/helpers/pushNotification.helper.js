const FCM = require('fcm-node');

const {FCM_SERVER_KEY} = require('./../config');

const fcm = new FCM(FCM_SERVER_KEY);

module.exports.sendNotification = ({title, body, registrationIds}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const message = {
        registration_ids: registrationIds,
        notification: {title, body},
        priority: 'high',
        android: {priority: 'high', importance: 'max'},
        data: {title, body},
      };

      fcm.send(message, (err, response) => {
        if (err) {
          console.log('Something has gone wrong!', err);
        } else {
          console.log('Successfully sent with response: ', response);
        }
      });

      return resolve();
    } catch (e) {
      return reject(e);
    }
  });
};
