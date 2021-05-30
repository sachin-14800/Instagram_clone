{
    // method to submit the form data using ajax
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/post/create',
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost=newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        });
        //method to create a post in DOM
        let newPostDom=function(post){
            return $(`<li id="post-${post._id}">
                <small>
                    <a class="delete-post-button"  href="/post/destroy/${p.id}">X</a>
                </small>
                ${ p.content }<br>
                ${ p.user.name }
            <div class="post-comments">
                    <form action="/comment/create" method="POST">
                        <input type="text" name="content" placeholder="Type here...">
                        <!-- important to recognise on which post the comment is added -->
                        <input type="hidden" name="post" value="${ p._id}">
                        <input type="submit" value="Add comment">
                    </form>

                    <div class="post-comments-list">
                        <ul id="post-comments-${ post._id }">
                        </ul>
                    </div>
                
            </div>
        </li>`)
        }


        createPost();
    }
}