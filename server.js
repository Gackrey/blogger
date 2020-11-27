const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const methodoverride = require('method-override');
const app = express();
const port = process.env.PORT || 3000;
const articles = require('./routes/article.js')
 
app.use(express.urlencoded({extended:false}));
app.use(methodoverride('_method'))
mongoose.connect('mongodb://localhost/gaurav',{ useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true });
const Article = require('./models/models');
app.set('view-engine','ejs');

app.get('/',async(req,res)=>{
    const articles = await Article.find().sort({time:"desc"});
    res.render('main.ejs',{articles:articles});
})
app.listen(port,()=>{
    console.log('Server started at port 3000');
});
app.use('/article',articles);