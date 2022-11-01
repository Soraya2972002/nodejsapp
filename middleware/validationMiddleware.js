module.exports =  (req,res,next)=>{
    console.log('in middleware')
    /*var errors = req.flash('validationErrors')
    console.log(errors)*/
    if(req.files == null){
        console.log('middleware if')
        return res.redirect("/posts/new")
        /*return res.redirect(url.format({
            pathname:'/posts/new',
            query: {
                errors: errors,
                title: title,
                body: body,
                img: img
            }
        }));*/
    }
    next()
}