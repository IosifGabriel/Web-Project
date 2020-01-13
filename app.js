const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');
const expressLayouts = require('express-ejs-layouts');
const ejsLint = require('ejs-lint');


mongoose.connect('mongodb://localhost/blogdb');
let db = mongoose.connection;


//Check connection
db.once('open', function(){
    console.log('Connected to MongoDB')
});


//Check for DB errors
db.on('error', function(err){
    console.log(err);
});


//init app
const app = express();
app.use(expressLayouts);
app.set('view engine', 'ejs');

// bring in models
let Article = require('./models/article');

//load view engine

app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');


// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());


// set public folder

app.use(express.static(path.join(__dirname, 'public')));


//express session middleware
app.use(session({
    secret: 'An nou fericit',
    resave: true,
    saveUnitialized: true
}));

//Express messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// express validator middleware

app.use(expressValidator({
    errorFormatter:function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.lenght){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param:formParam,
            msg : msg, 
            value : value
        };
    }
}));


// Passport config
app.use(passport.initialize());
app.use(passport.session());

// passport middleware
require('./config/passport')(passport);

app.get('*', function(req, res,next){
    res.locals.user = req.user || null;
    next();
});

//home route
app.get('/',function(req,res){
    res.render('index',{
            title:'Index'
    });
});

app.get('/about',function(req,res){
    res.render('about',{
            title:'About me'
    });
});

app.get('/mystory',function(req,res){
    res.render('mystory',{
            title:'My story into WeBDeV'
    });
});



app.get('/blog',function(req,res){
    Article.find({}, function(err, articles){
        if(err)
        {
            console.log(err);
        }
        else{
        res.render('blog',{
            title:'Blog',
            articles: articles
        });
    }
    });
  
});





// Route files

let articles = require ('./routes/articles');
let users = require ('./routes/users');
let events = require('./routes/events')
app.use('/articles', articles);
app.use('/users', users);
app.use('/events', events);

//start server
app.listen(3000,function(){
    console.log('Server started on port 3000..');
})