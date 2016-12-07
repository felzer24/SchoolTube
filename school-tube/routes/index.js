var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

require('../models/Posts');
require('../models/Comments');
require('../models/Users');
require('../models/Playlists');

module.exports = router;

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var Playlist = mongoose.model('Playlist');

var passport = require('passport');
var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.get('/playlists', function(req, res, next){
  Playlist.find(function(err, playlists){
    if(err){ return next(err); }

    res.json(playlists);
  });
});

router.post('/playlists', auth, function(req, res, next){
  console.log("request:");
  console.log(req.body);
  var playlist = new Playlist(req.body);
  playlist.author = req.payload.username;
  console.log(playlist);
  console.log("trying to save playlist");
  playlist.save(function(err, playlist){
    if(err){
      console.log("something went wrong: "+err);
      return next(err);
    }
    res.json(playlist);
  });
});

router.get('/playlists/:playlist', function(req, res, next) {
  req.playlist.populate('posts', function(err, playlist) {
    if (err) { return next(err); }

    res.json(playlist);
  });
});

router.put('/playlists/:playlist/delete', auth, function(req, res, next) {
  req.query.remove(function(err, playlist){
    res.json(playlist);
  });
});

router.param('playlist', function(req, res, next, id) {
  var query = Playlist.findById(id);

  query.exec(function (err, playlist){
    if (err) { return next(err); }
    if (!playlist) {
      console.log("can't find playlist");
      return next(new Error('can\'t find playlist'));
    }

    req.playlist = playlist;
    req.query = query;
    return next();
  });
});

router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
  });
});

router.post('/posts', auth, function(req, res, next) {
  var post = new Post(req.body);
  post.author = req.payload.username;

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

router.put('/posts/:post/like', auth, function(req, res, next) {
  req.post.like(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

router.put('/posts/:post/dislike', auth, function(req, res, next) {
  req.post.dislike(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

router.post('/posts/:post/comments', auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;
  comment.author = req.payload.username;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment;
    return next();
  });
});
 
router.put('/posts/:post/comments/:comment/like', auth, function(req, res, next) {
  req.comment.like(function(err, comment){
    if (err) { return next(err); }

    res.json(comment);
  });
});

router.put('/posts/:post/comments/:comment/dislike', auth, function(req, res, next) {
  req.comment.dislike(function(err, comment){
    if (err) { return next(err); }

    res.json(comment);
  });
});

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    
    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});
