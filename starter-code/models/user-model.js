const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    userName: {type: String, required:true, unique:true, minlength: 2},
    
    encryptedPassword: { type: String, required:true, },
}, 
{
// additional settings for the Schema class defined here
});

//"User model -> "users" collection
const User = mongoose.model("User", userSchema);

module.exports = User;