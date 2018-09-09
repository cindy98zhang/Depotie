var express = require('express');
var mongoose = require('mongoose')
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var User = require('./Model.js').User;
var Post = require('./Model.js').Post;


// Express setup
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', function() {
  console.log('Connected to MongoDB!')
})
mongoose.connection.on('error', function(err) {
  console.log(err)
})

app.post('/register', function(req, res) {

      User.findOne({username: req.body.username}, function(err, user) {
        if (err) res.json({'error': err});
        else if (user) res.json({'error': 'username already existed'});
        else {
          new User(req.body)
          .save()
          .then(() => res.json({'success': true}))
          .catch((err) => res.status(500).end(err.message))
        }
      })

})

app.post('/login', function(req, res) {
  if (typeof req.body.username === 'string' && typeof req.body.password === 'string') {
    User.findOne({username: req.body.username}, function(err, result) {
      if (err) res.json({'error': err});
      if (!result) {
        res.json({'error': 'Username not found!'});
      } else {
        if (result.password === req.body.password) {
          res.json({'success': true})
        } else {
          res.json({'error': "Wrong password"});
        }
      }
    })
  } else {
    res.json({'error': 'Invalid username or password.'});
  }
});

app.get('/posts', function(req, res) {
  Post.find(function(err, posts) {
    if (err) res.json({error: "get posts error"});
    res.json({posts: posts})
  })
});

app.post('/myposts', function(req, res) {
  Post.find({owner: req.body.username},function(err, posts) {
    let notify = [];
    if (err) res.json({error: "get my posts error"});
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].likes.length >= 5) {
        if (posts[i].notified) continue;
        else {
          posts[i].notified = true;
          posts[i].update(posts[i], function(err) {
            if (err) res.json({error: "notified update error"});
          })
          notify.push(posts[i]);
        }
      }
    }
    console.log(posts);
    res.json(Object.assign({}, {posts: posts}, {notify: notify}));
  })
});

app.post('/createMyPost', function(req, res) {
  new Post({
    date: new Date(),
    owner: req.body.username,
    comments: [],
    likes: [],
    class: req.body.class,
    body: {
      title: req.body.title,
      introduction: req.body.introduction,
      image: req.body.image
    },
    detail: req.body.things
  }).save()
  .then(() => res.json({'success': true}))
  .catch((err) => res.status(500).end(err.message))
});

app.post('/likes', function(req, res) {
  Post.findOne({_id: req.body.id}, function(err, post) {
    if (err) res.json({error: "Likes post error"});
    for (var i = 0; i < post.likes.length; i++) {
      if (post.likes[i] === req.body.username) return;
    }
    post.likes.push(req.body.username);
    post.update(post, function(err) {
      if (err) res.json({error: "Update like post error"});
      res.json({success: true});
    })
  })
});

app.post('/sendcomment', function(req, res) {
  Post.findOne({_id: req.body.id}, function(err, post) {
    if (err) res.json({error: "comment post error"});
    post.comments.push({username: req.body.username, comment: req.body.comment});
    post.update(post, function(err) {
      if (err) res.json({error: "Update comment post error"});
      res.json({success: true});
    })
  })
});

// app.post('/uploadimages', (req, res) => {
//   console.log(req);
//   console.log("-----------------------")
//   console.log(req.body);
//   res.json({success: true});
// });


app.listen(3000, function() {
  console.log("Server starting!")
})
