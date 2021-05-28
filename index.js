const port=8000;
const express=require('express');
const expressEjsLayouts = require('express-ejs-layouts');

const db=require('./config/mongoose');
const app=express();
app.use(express.urlencoded());
app.use(expressEjsLayouts);
app.set('LayoutextractStyles',true);
app.set('LayoutextractScripts',true);
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('assests'));
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log(err);
    }
    console.log("Server is running successfully on port: ",port);
});