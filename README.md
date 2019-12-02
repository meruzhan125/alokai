[![CircleCI](https://circleci.com/gh/squadded/widget/tree/master.svg?style=svg&circle-token=2025ce5fc3b5de9246280fb68da07286c0534bb6)](https://circleci.com/gh/squadded/widget/tree/master)


# Widget

>

## Build Setup

~~~bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
~~~

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Build Env Vars
- `WS_LINK`: fully qualified URL (with port) of the Websocket endpoint (example: `wss://api.squadded.co/`)
- `BASE`: Base URL of the HTML document in the iframe (example: `/widget/`)
- `FB_APP_ID`
- `IG_CLIENT_ID`
- `API_ENDPOINT`: the fully qualified endpoint root of the backend services, no trailing slash (example: `https://api.squadded.co`)

## Use in local dev against prod backend

In order to use a dev version of the Widget with production backend, you must do the following:

1. Create a `dev/.env` file in which you place the env vars mentioned above (`FB_APP_ID` and `IG_CLIENT_ID` must be defined but their value is not relevant)

Nuxt will launch the project in watch mode with a message like this one:

~~~
   ╭─────────────────────────────────────────────────╮
   │                                                 │
   │   Nuxt.js v2.10.0                               │
   │   Running in development mode (spa)             │
   │                                                 │
   │   Listening on: http://10.0.2.15:3000/widget/   │
   │                                                 │
   ╰─────────────────────────────────────────────────╯


ℹ Preparing project for development
ℹ Initial build may take a while
✔ Builder initialized
✔ Nuxt files generated

✔ Client
  Compiled successfully in 24.60s

ℹ Waiting for file changes
ℹ Memory usage: 261 MB (RSS: 522 MB)           
~~~

2. In the Application tab of your local dev site, register a `userToken` key in `LocalStorage`, with the value
that you will copy from the production site for your user.

3. In the Console pane, execute the following commands:

~~~javascript
window.postMessage(JSON.stringify({
    type: 'injectMerchantParams', 
    merchantId: 'sam-advisor', 
    siteUrl: 'https://www.sam-advisor.com/myboutique', siteTitle: 'My Super Merchant Site'
    }));

window.postMessage(JSON.stringify({
      type: 'widgetState',
      open: true,
    }));
~~~
