//file for toggling the header dropdown options

{
    let flag=true;
$('#user-class').on('click',function(){
    
    if(flag){
        //changing the display so that it is visible when clicked
    $('.hidden').css('display','inline');
    flag=false;
    }
    else{
        //changing the display so that it again gets hide when clicked again
        $('.hidden').css('display','none');
    flag=true;
    }
});
}