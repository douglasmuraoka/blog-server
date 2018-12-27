const fs = require('fs');
const { promisify } = require('util');
const existsAsync = promisify(fs.exists);
const unlinkAsync = promisify(fs.unlink);
const writeFileAsync = promisify(fs.writeFile);
const path = require('path');
const axios = require('axios');
const faker = require('faker');

const POSTS_COUNT = 100;
const USERS_COUNT = 100;
const COMMENTS_COUNT = 200;

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const createUsers = async () => {
  const randomUsers = (await axios.get(`https://randomuser.me/api/?results=${USERS_COUNT}`)).data.results;
  const users = [];
  for (let u=0; u<USERS_COUNT; u++) {
    const { name, email, picture } = randomUsers[u];
    users.push({
      id: u,
      name: `${capitalizeFirstLetter(name.first)} ${capitalizeFirstLetter(name.last)}`,
      email: email,
      avatarUrl: picture.medium
    });
  }
  // console.log(JSON.stringify(users));
  return users;
};

const createPosts = users => {
  const posts = [];
  for (let p=0; p<POSTS_COUNT; p++) {
    posts.push({
      id: p,
      author: users[Math.round(Math.random() * (USERS_COUNT - 1))],
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(),
      createdAt: faker.date.past(),
      imageUrl: `https://s3.eu-central-1.amazonaws.com/douglasmuraoka-blog-react-redux/images/${Math.round(Math.random() * 9) + 1}.jpg`
    });
  }
  // console.log(JSON.stringify(posts));
  return posts;
};

const createComments = (posts, users) => {
  const comments = [];
  const now = new Date();
  for (let c=0; c<COMMENTS_COUNT; c++) {
    const postId = Math.round(Math.random() * (POSTS_COUNT - 1));
    const { createdAt: postCreatedAt } = posts[postId];
    comments.push({
      id: c,
      postId: Math.round(Math.random() * (POSTS_COUNT - 1)),
      name: capitalizeFirstLetter(faker.lorem.words()),
      author: users[Math.round(Math.random() * (USERS_COUNT - 1))],
      body: faker.lorem.sentences(),
      createdAt: faker.date.between(postCreatedAt, now)
    });
  }
  console.log(JSON.stringify(comments));
  return comments;
};

const initDb = async () => {
  const dbFilePath = path.resolve(__dirname, 'db.json');
  if (await existsAsync(dbFilePath)) {
    await unlinkAsync(dbFilePath);
  }

  const users = await createUsers();
  const posts = createPosts(users);
  const comments = createComments(posts, users);

  const db = {
    users,
    posts,
    comments
  };
  await writeFileAsync(dbFilePath, JSON.stringify(db));
}
initDb();