const db = require('../config/connection');
const { User, Todo } = require('../models');
const userSeeds = require('./userData.json');
const todoSeeds = require('./todoData.json');

db.once('open', async () => {
  try {
    await Todo.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < todoSeeds.length; i++) {
      const { _id, todoAuthor } = await Todo.create(todoSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: todoAuthor },
        {
          $addToSet: {
            todos: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
