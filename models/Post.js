const mongoose = require('mongoose')

// Schema
const postSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    author: {
        type: String, 
        required: true
    },
    type: {
        type: String, 
    },
    image: {
		type: String,
		required: true
	},
    description: {
		type: String,
		default: true
	},
    body: {
        type: String, 
        required: true
    },
    reading: {
        type: String, 
    },
    ownerlogo: {
        type: String,
    },
    comments: {
        type: Array
    },
    date: { type: Date, default: Date.now },

})


// Modelo

const Post = mongoose.model("Post", postSchema)



module.exports = Post;