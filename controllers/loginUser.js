const bcrypt = require('bcrypt')
const User = require('../models/users')
module.exports = (req, res) =>{
    req.session['notification'] = ""
    const { username, password } = req.body;
    User.findOne({username:username}, (error,user) => {
        if (user){
            bcrypt.compare(password, user.password, (error, same) =>{
                if(same){ // if passwords match
                    // store user session, will talk about it later
                    req.session.userId = user._id
                    res.redirect('/')
                }
                else{
                    req.flash("error", "Authentication failed");
                    res.redirect('/auth/login')
                }
            })
        }
        else{
        res.redirect('/auth/login')
        }
    })
}