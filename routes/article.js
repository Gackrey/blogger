const express = require('express');
const Article = require('./../models/models')
const router = express.Router();
router.get('/new',(req,res)=>{
    res.render('article.ejs',{article:new Article()})
});
router.get('/edit/:slug',async(req,res)=>{
    try{
        let article = await Article.findOne({slug: req.params.slug});
        res.render('edit.ejs',{article:article})
    }catch(e){
        console.log(e);
        res.redirect('/');
    }
});
router.post('/',async(req,res,next)=>{
    req.article = new Article();
    next();
},savearticle('article'));

router.put('/:id',async(req,res,next)=>{
    req.article = await Article.findById(req.params.id);
    next();
},savearticle('edit'));
function savearticle(path){
    return async(req,res)=>{
        let article = req.article;
        article.title = req.body.title,
        article.description = req.body.description,
        article.markdown = req.body.markdown
        try{
            article = await article.save();
            res.redirect(`/article/${article.slug}`);
        }catch(e){
            res.render(`${path}.ejs`,{article:article});
        }
    }
}
router.get('/:slug',async(req,res)=>{
    try{
        let article = await Article.findOne({slug: req.params.slug});
        res.render('show.ejs',{article:article})
    }catch(e){
        console.log(e);
        res.redirect('/');
    }
});
router.delete('/:id',async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/');
})
module.exports = router;