const mongoose = require('mongoose');

// if we're having trouble connecting with just local host we can try 'mongodb://127.0.0.1:27017/curriculum_corner'

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/curriculum_corner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;