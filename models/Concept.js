const mongoose = require('mongoose');

const ConceptSchema = mongoose.Schema({

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
    date: { type: Date, default: Date.now },



})


const Concept = mongoose.model("Concept", ConceptSchema)

module.exports = Concept;