const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');


const seedDatabase = async () => {
  console.log('syncing...');
  await sequelize.sync({ force: true });
  console.log('sunc');
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const post_ids = [];
  for (const post of postData) {
    const _post = await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    post_ids.push(_post.id);
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: post_ids[Math.floor(Math.random() * post_ids.length)]
    });
  }

  process.exit(0);
};

seedDatabase();
