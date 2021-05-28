module.exports.profile=function(req,res)
{
    return res.render('profile',{
        title:"Instagram",
        name:"Sachin Gupta"
    });
}