const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
		type: String,
		required: true
	},
	nickname: {
		type: String,
		default: ""
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
    admin: {
		type: Boolean,
		default: false
	}
})


const User = mongoose.model("User", userSchema)


module.exports = User;