const express=require('express');
const app=express();
const exphbs=require('express-handlebars')
const port=4004;

app.engine('handlebars',exphbs({
    defaultLayout:'main'
}));

app.set('view engine','handlebars');

app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/about',(req,res)=>{
    res.send("Welcome");
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});