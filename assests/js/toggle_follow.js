//Class for toggling the follow for the user

class ToggleFollow{
    //constructor 
    constructor(element)
    {
        this.toggler=element;
        this.toggleFollow();
    }

    //function for toggle
    toggleFollow()
    {
        //adding a click event
        $(this.toggler).click(function(event){
            //prevent the default behaviour
            event.preventDefault();
            let self=this;

            //doing it through ajax
            $.ajax({
                type:'POST',
                url:$(self).attr('href'),

            }).done(function(data){
                //when the ajax call is done increase or decrease the follow count
                let Followcount=parseInt($('.follower').attr('follows'));
                if(data.data.deleted==true)
                {
                    //changing the unfollow to follow and decreasing the count
                   $(self).html(`Follow`);
                   Followcount-=1;
                }
                else{
                    // changing follow to unfollow and increase the count
                    Followcount+=1;
                $(self).html(`Unfollow`);
                }

                //setting the attribute value as well for easy excess
                $('.follower').attr('follows',Followcount);

                //changing the number of followers on the front end
                $('.follower').html(`<b>${Followcount}</b> Followers`);
            }).fail(function(errData){
                //if the request is failed
                console.log('Error in completing the request');
            });
        });
    }
}