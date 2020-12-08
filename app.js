//load modules
const express=require('express');
const exphbs=require('express-handlebars');
const mongoose=require('mongoose');
const keys=require('./config/keys');
//conne
// const keys=require('./config/keys');
const app=express();

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



app.listen(port,()=>{
	console.log(`server is running on port ${port}`)
})