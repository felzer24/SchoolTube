var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({ 
	author: String,
	body: String,
	likes: {type: Number, default: 0},
	post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

CommentSchema.methods.like = function(cb) {
	this.likes += 1;
	this.save(cb);
}

CommentSchema.methods.dislike = function(cb) {
	this.likes -= 1;
	this.save(cb);
}

mongoose.model('Comment', CommentSchema);