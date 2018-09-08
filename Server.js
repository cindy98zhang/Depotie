var express = require('express');
var mongoose = require('mongoose')
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
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



app.listen(3000, function() {
  console.log("Server starting!")
})
