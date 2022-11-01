const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});
BlogPost.create({
title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
body: 'If you have been here a long time, you might remember when I went on ITV Tonight todispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite moneytopics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerderyopens up. You know those bullet-point lists. You start spotting them everything at this time of year.They go like this:'
}, (error, blogpost) =>{
console.log(2,error,blogpost)
})
BlogPost.find({
    title:'The Mythbuster’s Guide to Saving Money on Energy Bills'
    }, (error, blogspot) =>{
    console.log(1,error,blogspot)
})

BlogPost.find({
    title:/The/}, (error, blogspot) =>{
    console.log(3,error,blogspot)
    })

var id = "634971916831c885580e58b4";
BlogPost.findById(id, (error, blogspot) =>{
console.log(4,error,blogspot)
})

var id = "634971916831c885580e58b4";
BlogPost.findByIdAndUpdate(id,{
title:'Updated title'
}, (error, blogspot) =>{
console.log(5,error,blogspot)
})

var id = "634971916831c885580e58b4";
BlogPost.findByIdAndDelete(id, (error, blogspot) =>{
console.log(6,error,blogspot)
})
