
{
    let flag=true;
$('#user-class').on('click',function(){
    
    if(flag){
    $('.hidden').css('display','inline');
    flag=false;
    }
    else{
        $('.hidden').css('display','none');
    flag=true;
    }
});
}