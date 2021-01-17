//load modules
const express=require('express');
const exphbs=require('express-handlebars');
const mongoose=require('mongoose');
const passport=require('passport');
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser=require('cookie-parser');
const keys=require('./config/keys');
// const keys=require('./config/keys');
require('./passport/google-passport');

const app=express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat',
					 reverse:true,
					saveUninitialized:true
 }));


app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars',exphbs({
	defaultLayout:'main'
}))

app.set('view engine','handlebars');
app.use(express.static('public'));
//const port=4400;

//mongoose.connect(keys.MongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(keys.MongoURI,
	{useNewUrlParser: true, useUnifiedTopology: true}
	).then(()=>{
	console.log("Connected to remote DataBase---");
}).catch((err)=>{
	console.log(err)
})



const port=process.env.PORT||4000;

app.get('/',(req,res)=>{
	res.render('home');
});

app.get('/about',(req,res)=>{
	res.send('about');
});

// app.get('/',(req,res)=>{
// 	res.send('welcome to social media app');
// });
//auth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res)=> {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

app.get('/profile',(req,res)=>{
	res.render('profile');
})
app.listen(port,()=>{
	console.log(`server is running on port ${port}`)
})