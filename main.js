// Loading Html element js
const btn_get_user_posts = document.querySelector('#btn-get-post');
const empty_widget = document.querySelector('.empty-widget');
const loading_widget = document.querySelector('.loading-widget');
const users_widget = document.querySelector('.users-widget');

// Api List
const GET_USER_POSTS_URL = "https://jsonplaceholder.typicode.com/users";

// Get user post
const getUserPosts = () => {
    fetch(GET_USER_POSTS_URL)
        .then((response) => response.json())
        .then((posts) => {
            loading_widget.style.display = 'none';
            let user_html_item = ``;
            posts.forEach(item => {
                user_html_item += `<div class="user-item">
            <h1 class="names">${item.name}</h1>
            <span class="email">${item.email}</span></div>`;
            });
            users_widget.innerHTML = user_html_item;
        });
}

// Handle app event
//===== Getting user post =====
btn_get_user_posts.addEventListener('click', (e) => {
    empty_widget.style.display = 'none';
    loading_widget.style.display = 'flex';
    users_widget.innerHTML = "";
    getUserPosts();
});