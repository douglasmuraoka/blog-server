# Blog Server

This is a blog server sample using json-server. This is the server-side only. The client-side can be found [here](https://github.com/douglasmuraoka/blog-react-redux).

# Getting Started

First of all, you are going to need `npm` installed. Check [here](https://www.npmjs.com/get-npm) to install. This application was tested on a Node 10 environment.

After `npm` installed, install the application dependencies:

```
npm i
npm i -g json-server
```

Then initialize the json-server database and run the server by running:
```
npm run start
```

The server should be deployed on `http://localhost:5000`.

## Features Overview

By initializing the database using `npm run start`, you will be creating three entities: `posts`, `comments` and `users`.

You can access them on `/posts`, `/comments` and `/users`.

Also, you can change how many entities are created by changing the `POSTS_COUNT`, `USERS_COUNT` and `COMMENTS_COUNT` on the `index.js` file.