//Method to submit the form data for new post using AJAX

{
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "POST",
        url: "/posts/createpost",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $("#post-container>div").prepend(newPost);
          let deletebutton=$(".delete-post-button");
          deletePost(deletebutton, newPost);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  //method to create post in dom  
  let newPostDom = function (post) {
    return $(`<div id="post-list-${post._id}">
        <a class ="delete-post-button" href="/posts/deletepost/${post._id}">Delete</a>
        <ul>
          <li>${post.content}</li>
          <p>${post.user.name}</p>
          <p>${post.createdAt}</p>
         <div id="post-comment-container">
          <form action="/comment/createcomment" method="POST">
          <input
           type="text"
           name="content"
           placeholder="Type Comment here..."
           />
          <input type="hidden" name="post" value="${post._id}" />
          <input type="submit" value="Add Comment" />
          </form>
          <div id="post-comment-list">
          <ul id="post-comment-${post._id}">

          </ul>
          </div>
          </div>
        </ul>
      </div>`);
  };

  //method to delete post from dom
  let deletePost=function(deleteLink)
  {
      $(deleteLink).click(function(e){
          e.preventDefault();

          $.ajax({
              type:'get',
              url:$(deleteLink).prop('href'),
              success:function(data)
              {
                $(`#post-list-${data.data.post_id}`).remove();
              },
              error:function(error)
              {
                console.log(error.responseText);
              }
          })
      })
  }

  createPost();
}
