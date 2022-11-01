module.exports = (req, res) =>{
    var title = ""
    var body = ""
    var img = ""
    const data = req.flash('data')[0];
    if(typeof data != "undefined"){
    title = data.title
    body = data.body
    img = data.img
    }
    res.render('create',{
        //errors: req.session.validationErrors
        errors: req.flash('validationErrors'),
        title: title,
        body: body,
        img : img,
        createPost: true
    }) //
}