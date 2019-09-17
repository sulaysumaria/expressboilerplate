# expressboilerplate

Boilerplate for NodeJS + Express + MongoDB + Mongoose

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
    ├── helpers
    │   ├── connectToDb.helper.js
    │   ├── excryption.helper.js
    │   └── requestValidator.helper.js
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
- NoSQL Booster
- Postman
