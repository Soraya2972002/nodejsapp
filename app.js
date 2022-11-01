/*const validateMiddleWare = (req,res,next)=>{
    if(req.files == null || req.body.title == null || req.body.title == null){
    return res.redirect('/posts/new')
    }
    next()
}*/

const validateMiddleware = require("./middleware/validationMiddleware");
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

const express = require('express')
const path = require('path')
const flash = require('connect-flash'); // to flush - remove unecessary infos after end of session
const app = new express()
const ejs = require('ejs');
const BlogPost = require('./models/BlogPost');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session');
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect('mongodb+srv://soraya2972002:tamalous12@test.jg6pwwj.mongodb.net/my_database', {useNewUrlParser: true});
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
app.use('/posts/store', validateMiddleware)
app.set('view engine','ejs')
app.use(express.static('public'))
let port = process.env.PORT;
if (port == null || port == "") {
port = 4000;
}
app.listen(port, ()=>{
console.log('App listening...')
})
/*app.listen(4000, ()=>{
console.log('App listening on port 4000')
})*/

/*app.get('/',async (req,res)=>{
    const blogposts = await BlogPost.find({})
    res.render('index',{
        blogposts: blogposts
    });
})
app.get('/about',(req,res)=>{
    res.render('about');
})    
app.get('/contact',(req,res)=>{
    res.render('contact');
}) 
app.get('/post/:id',async (req,res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post',{
    blogpost
    })
})
app.post('/posts/store', (req,res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'public/assets/img',image.name),async (error)=>{
        await BlogPost.create({
            ...req.body,
            image: '/assets/img/' + image.name
            })            
    res.redirect('/')
    })
})

app.get('/posts/new',(req,res)=>{
    res.render('create')
})
    
app.post('/filter', async (req,res)=>{
    await BlogPost.create(req.body)
    const blogposts = await BlogPost.find(req.body)
    res.render('index',{
        blogposts: blogposts
    });
})*/

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

const newPostController = require('./controllers/newPost')
const newContactController = require('./controllers/contact')
const newAboutController = require('./controllers/about')
const newHomeController = require('./controllers/home')
const newgetPostController = require('./controllers/getPost')
const newstorePostController = require('./controllers/storePost')
const newuserPostController = require('./controllers/storeUser')
const newUserController = require('./controllers/newUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

app.get('/posts/new',authMiddleware,newPostController)
app.get('/about',newAboutController)
app.get('/contact',newContactController)
app.get('/',newHomeController)
app.get('/post/:id',newgetPostController)
app.post('/posts/store',authMiddleware,newstorePostController)
app.post('/users/register',redirectIfAuthenticatedMiddleware, newuserPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'));