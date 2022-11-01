const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true,'Please provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please provide password']
    }
});
// export model
UserSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
    })
})
UserSchema.plugin(uniqueValidator); // for errors related to mongoose like duplicated elements
const User = mongoose.model('User',UserSchema);
module.exports = User