class ToggleLike{
    constructor(element)
    {
        this.toggler=element;
        this.toggleLike();
    }
    toggleLike()
    {
        $(this.toggler).click(function(event){
            event.preventDefault();
            let self=this;
            $.ajax({
                type:'POST',
                url:$(self).attr('href'),

            }).done(function(data){
                let Likescount=parseInt($(self).attr('data-likes'));
                if(data.data.deleted==true)
                {
                    Likescount-=1;
                    $(self).html(`<i class="far fa-heart red"></i> ${Likescount} Likes`);
                }
                else{
                    Likescount+=1;
                    $(self).html(`<i class="fas fa-heart red"></i> ${Likescount} Likes`);
                }
                

                $(self).attr('data-likes',Likescount);
                
            }).fail(function(errData){
                console.log('Error in completing the request');
            });
        });
    }
}