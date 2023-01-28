const mongoose = require('mongoose');

// if we're having trouble connecting with just local host we can try 'mongodb://127.0.0.1:27017/curriculum_corner'

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/curriculum_corner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // these two below we included in the book search starter code and seemed to work with that, but we may not need them
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;