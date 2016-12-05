var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({ 
	author: String,
	body: String,
	likes: {type: Number, default: 0},
	post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

mongoose.model('Comment', CommentSchema);

// var mongoose = require('mongoose');

// var CommentSchema = new mongoose.Schema({ 
// 	author: String,
// 	body: String,
// 	likes: {type: Number, default: 0},
// 	post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
// });

// mongoose.model('Comment', CommentSchema);