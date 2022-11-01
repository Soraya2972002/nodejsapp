const BlogPost = require('../models/BlogPost.js')
const path = require('path')
module.exports = (req,res)=>{
    console.log('in store')
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'..','public/assets/img',image.name),async (error)=>{
        await BlogPost.create({
            ...req.body,
            image: '/assets/img/' + image.name,
            userid: req.session.userId
            },(error, post) => {
                if(error){
                    const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
                    console.log(validationErrors)
                    req.flash('validationErrors',validationErrors)
                    req.flash('data',req.body)
                    //req.session.validationErrors = validationErrors //to save the errors in our session
                    return res.redirect('/posts/new')
                }
                res.redirect('/')
            })       
    })
}