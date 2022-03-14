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
    comments: {
        type: Array
    },

})


// Modelo

const Post = mongoose.model("Post", postSchema)



module.exports = Post;