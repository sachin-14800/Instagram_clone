//class for toggling the like
class ToggleLike{

    //constructor
    constructor(element)
    {
        this.toggler=element;
        this.toggleLike();
    }
    //function to toggle
    toggleLike()
    {
        $(this.toggler).click(function(event){
            //preventing the default event
            event.preventDefault();
            let self=this;

            //doing it through ajax
            $.ajax({
                type:'POST',
                url:$(self).attr('href'),

            }).done(function(data){
                //when the ajax call is done increase or decrease the like count
                let Likescount=parseInt($(self).attr('data-likes'));
                if(data.data.deleted==true)
                {
                    //changing the class of like button and decreasing the count
                    Likescount-=1;
                    $(self).html(`<i class="far fa-heart red"></i> ${Likescount} Likes`);
                }
                else{
                    //changing the class of like button the increasing the count
                    Likescount+=1;
                    $(self).html(`<i class="fas fa-heart red"></i> ${Likescount} Likes`);
                }
                
                //setting the attribute value for easy acess
                $(self).attr('data-likes',Likescount);
                
            }).fail(function(errData){
                //if ajax request is failed
                console.log('Error in completing the request');
            });
        });
    }
}