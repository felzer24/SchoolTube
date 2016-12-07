var mongoose = require('mongoose');

var PlaylistSchema = new mongoose.Schema({ 
	title: String,
	author: String,
	description: String,
	likes: {type: Number, default: 0},
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

mongoose.model('Playlist', PlaylistSchema);