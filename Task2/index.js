'use strict';

let postsNumber = 0;
let comentsNumber = 0;

const changePostsNumber = () => postsNumber++;

const creation = document.getElementById('creation');

const textareaDiv = document.createElement('div');
textareaDiv.setAttribute('id', 'textarea');
textareaDiv.innerHTML = `
  <textarea id="post-textarea"></textarea>
  <button id="post" onclick="changePostsNumber()">Post</button>
`;

const removePost = id => {
  postsNumber--;
  const posts = document.getElementById('posts');
  const post = document.getElementById(id);
  posts.removeChild(post);
};

const changeLikesNumber = (likes, id) => {
  const string = likes ? '' : 'dis';
  const post = document.getElementById(`${string}likes${id}`);
  const index = post.innerText.indexOf(' ');
  const number = Number(post.innerText.substring(0, index));
  post.innerText = String(number + 1) + ` ${string}likes`;
};

let modifying = false;
let current;
let currentCommentingPostID;
let currentCommentingPost;
let currentComment;
let editing = false;

const selectComment = id => {
  const comment = document.getElementById(id);
  comment.childNodes[1].classList.toggle('badge-selected');
  comment.childNodes[3].classList.toggle('comment-show');
  comment.childNodes[5].classList.toggle('comment-show');
};

const modifyPost = id => {
  modifying = true;
  creation.appendChild(textareaDiv);
  const post = document.getElementById(id);
  current = post.childNodes[1];
  console.log(post.childNodes[1].innerText);
  document.getElementById('post-textarea').value = post.childNodes[1].innerText;
};

const postComment = () => {
  if (editing) {
    const value = document.getElementById('comment-textarea').value;
    currentComment.childNodes[1].innerText = value;
    currentCommentingPost.removeChild(comment);
    editing = false;
    return;
  }
  comentsNumber++;
  const value = document.getElementById('comment-textarea').value;
  document.getElementById('comment-textarea').value = '';
  currentCommentingPost.removeChild(comment);
  currentCommentingPost.innerHTML += `
    <div id="c${comentsNumber}" onclick="selectComment('c${comentsNumber}')">
      <p class="badge">${value}</p>
      <button 
        class="modify comment-hide" 
        id="editComment" 
        onclick="editComment(${currentCommentingPostID}, 'c${comentsNumber}')"
      >
        Edit
      </button>
      <button 
        class="delete 
        comment-hide" 
        id="deleteComment" 
        onclick="deleteComment(${currentCommentingPostID}, 'c${comentsNumber}')"
      >Delete</button>
    </div>
  `;
};

const deleteComment = (postID, commentID) => {
  const post = document.getElementById(postID);
  const comment = document.getElementById(commentID);
  post.removeChild(comment);
};

const editComment = (postID, commentID) => {
  editing = true;
  const post = document.getElementById(postID);
  currentCommentingPost = post;
  const postComment = document.getElementById(commentID);
  currentComment = postComment;
  post.appendChild(comment);
  const commentTextarea = document.getElementById('comment-textarea');
  commentTextarea.value = postComment.childNodes[1].innerText;
};

const comment = document.createElement('div');
comment.setAttribute('class', 'comment-section');
comment.innerHTML = `
  <p>Leave the comment</p>
  <textarea class="comment-textarea" id="comment-textarea"></textarea>
  <button class="post-comment" onclick="postComment()">Post comment</button>
`;

const makeComment = id => {
  const post = document.getElementById(id);
  currentCommentingPostID = id;
  currentCommentingPost = post;
  post.appendChild(comment);
  document.getElementById('comment-textarea').value = '';
};

const post = text => `
  <div class="card" id="${postsNumber}">
    <p>${text}</p>
    <div class="likes">
      <button class="like" onclick="changeLikesNumber(true, ${postsNumber})">Like</button>
      <p id="likes${postsNumber}">0 likes<p>
      <p id="dislikes${postsNumber}" class="dislikes">0 dislikes<p>
      <button class="dislike" onclick="changeLikesNumber(false, ${postsNumber})">Dislike</button>
    </div>
    <button class="comment" onclick="makeComment(${postsNumber})">Comment</button>
    <button class="modify" onclick="modifyPost(${postsNumber})">Modify</button>
    <button class="delete" onclick="removePost(${postsNumber})">Delete</button>
    <h2>Comments:</h2>
  </div>
`;

const createPostButton = document.getElementById('create-post');
createPostButton.addEventListener('click', () => {
  creation.appendChild(textareaDiv);
  const textarea = document.querySelector('textarea');
  document.getElementById('post').addEventListener('click', () => {
    creation.removeChild(textareaDiv);
    if (!modifying) document.getElementById('posts').innerHTML += post(textarea.value);
    else current.innerHTML = textarea.value;
    modifying = false;
    current = null;
    textarea.value = '';
  });
});
