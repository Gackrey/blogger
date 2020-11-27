const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const { JSDOM } =require('jsdom');
const createdompurify = require('dompurify')
const dompurify = createdompurify(new JSDOM().window);
var article = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    markdown:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    sanitizedHtml:{
        type:String,
        required:true
    }
});
article.pre('validate',function(next){
    if(this.title){
        this.slug = slugify(this.title,{lower:true,
        strict:true})
    }
    if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }
    next()
})
const articleschema = mongoose.model("article",article);

module.exports = articleschema;