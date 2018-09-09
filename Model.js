var mongoose = require('mongoose');
if (! process.env.MONGODB_URI) {
  console.log('Error: MONGODB_URI is not set. Did you run source env.sh ?');
  process.exit(1);
}
var connect = process.env.MONGODB_URI;
mongoose.connect(connect);


var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var postSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  body: {
    type: Object,
    required: true
  },
  detail: {
    type: Array,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  comments: {
    type: Array,
    required: true
  },
  likes: {
    type: Array,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  notified: {
    type: Boolean,
    default: false
  }
});


var User = mongoose.model('User', userSchema);
var Post = mongoose.model('Post', postSchema);

module.exports = {
  User: User,
  Post: Post
}
