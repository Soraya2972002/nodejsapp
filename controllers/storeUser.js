const User = require('../models/users.js')
const path = require('path')
module.exports = (req,res)=>{
    console.log('here')
    User.create(req.body, (error, user) => {
    if(error){
        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
        req.flash('validationErrors',validationErrors)
        req.flash('data',req.body)
        /*req.session.validationErrors = validationErrors*/ //to save the errors in our session
        return res.redirect('/auth/register')
    }
    res.redirect('/')
    })
}