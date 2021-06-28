class ToggleFollow{
    constructor(element)
    {
        this.toggler=element;
        this.toggleFollow();
    }
    toggleFollow()
    {
        $(this.toggler).click(function(event){
            event.preventDefault();
            let self=this;
            $.ajax({
                type:'POST',
                url:$(self).attr('href'),

            }).done(function(data){
                let Followcount=parseInt($('.follower').attr('follows'));
                if(data.data.deleted==true)
                {
                   $(self).html(`Follow`);
                   Followcount-=1;
                }
                else{
                    Followcount+=1;
                $(self).html(`Unfollow`);
                }
                $('.follower').attr('follows',Followcount);
                $('.follower').html(`<b>${Followcount}</b> Followers`);
            }).fail(function(errData){
                console.log('Error in completing the request');
            });
        });
    }
}