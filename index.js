const port=8000;
const express=require('express');

const app=express();
app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err)
    {
        console.log(err);
    }
    console.log("Server is running successfully on port: ",port);
});