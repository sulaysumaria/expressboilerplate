# expressboilerplate

Boilerplate for NodeJS + Express + MongoDB + Mongoose

## Tech Stack

Node - 10.16.3
NPM - 6.11.3
MongoDB - 4.2.0

## Key features

- REST API (express)
- MongoDB (mongoose)
- Encryption/Decryption (crypto)
- Push Notification (FCM)
- Mail Sender (Sendgrid)
- CronJobs (cron)
- Localization (i18n)
- Code linter (eslint)
- Validation (joi)

## Structure

```bash
.
├── README.md
├── index.js # entry point
├── package-lock.json
├── package.json
├── public # static file served from here
│   └── foo.json
└── src
    ├── app.js
    ├── config.js
    ├── controllers
    │   └── auth.controller.js
    ├── cron
    │   ├── index.js # cron jobs are loaded from here
    │   └── logTime.js
    ├── helpers
    │   ├── connectToDb.helper.js
    │   ├── excryption.helper.js
    │   ├── pushNotification.helper.js
    │   ├── requestValidator.helper.js
    │   └── sendMail.helper.js
    ├── locales # locales are generated here
    │   ├── de.json
    │   └── en.json
    ├── middlewares
    │   └── extendReq.middleware.js
    ├── models
    │   ├── index.js # models are loaded from here
    │   └── user.model.js
    ├── routes
    │   ├── auth.routes.js
    │   └── index.js # routes are loaded from here
    └── validators
        └── auth.validator.js
```

## Recommended Tools

- VSCode
  - Eslint
  - Prettier - Code formatter
- NoSQL Booster
- Postman
