const port=8000;
const express=require('express');

const db=require('./config/mongoose');
const app=express();
app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('assests'));
app.use('/',require('./routes'));
// app.get('/',function(req,res){
//     return res.render('home');
// });
app.listen(port,function(err){
    if(err)
    {
        console.log(err);
    }
    console.log("Server is running successfully on port: ",port);
});