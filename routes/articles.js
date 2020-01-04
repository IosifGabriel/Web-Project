const express = require('express');
const router = express.Router();

// bring in models
let Article = require('../models/article');

//user model
let User = require('../models/user');

// add route

router.get('/add', ensureAuthenticated,  function(req, res){
    res.render('add_article', {
        title:'Add Articles'
    });
});


// add submit post route

router.post('/add', function(req, res){
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('image', 'Image is required').notEmpty();
    req.checkBody('body', 'Body is required').notEmpty();


    //Get erros
    let errors = req.validationErrors();
    
    if(errors)
    {
        res.render('add_article', {
            title:'Add Article',
            errors:errors
        });
    }else{
        let article =  new Article();
        article.title = req.body.title;
        article.author = req.user._id;
        article.body= req.body.body;
        article.image = req.body.image;
        article.postDate = GetDate();


        article.save(function(err){
            if(err){
                console.log(err);
                return;
            }else{
                req.flash('success','Article added');
                res.redirect('/');
            }
        });
    }

});


// update submit post route

router.post('/edit/:id', function(req, res)
{
    let article = {};
    article.title = req.body.title;
    article.author = req.user._id;
    article.body= req.body.body;
    article.image = req.body.image;
    article.postDate= GetDate();

    let query = {_id:req.params.id}

    Article.update(query, article, function(err){
        if(err){
            console.log(err);
            return;
        }else{
            req.flash('sucess','Article updated')
            res.redirect('/');
        }
    });
});

// delete article

router.delete('/:id', function(req, res){
    if(!req.user._id){
      res.status(500).send();
    }
  
    let query = {_id:req.params.id}
  
    Article.findById(req.params.id, function(err, article){
      if(article.author != req.user._id){
        res.status(500).send();
      } else {
        Article.remove(query, function(err){
          if(err){
            console.log(err);
          }
          res.send('Success');
        });
      }
    });
  });



// load edit form

router.get('/edit/:id', ensureAuthenticated,  function(req,res){
    Article.findById(req.params.id, function(err,article){
        if(article.author != req.user._id){
            req.flash('danger', 'Not Authorized');
            res.redirect('/');
        }
        res.render('edit_article',{
            title:'Edit Article',
            article:article
        });
    });
});



//Access Control

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated() && req.user.admin == true ){
        return next();
    } else {
        req.flash('danger', 'Your action is unauthorized');
        res.redirect('/users/login');
    }

}


// Get Single Article
router.get('/:id', function(req, res){
    Article.findById(req.params.id, function(err, article){
      User.findById(article.author, function(err, user){
        res.render('article', {
          article: article,
          title: article.title,
          author: user.name
        });
      });
    });
  });

function GetDate (){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
        } 

    if (mm < 10) {
        mm = '0' + mm;
    } 
    var today = dd + '/' + mm + '/' + yyyy;
    return today;
}


module.exports = router;