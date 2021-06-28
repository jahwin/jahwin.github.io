// Loading Html element js
const empty_widget = document.querySelector('.empty-widget');
const loading_widget = document.querySelector('.loading-widget');
const users_widget = document.querySelector('.users-widget');
const posts_body = document.querySelector('.posts-body');
const user_post_overlay = document.querySelector('.user-post-overlay');
const loading_modal_widget = `<div class="loading-widget-modal">Loading...</div>`;
const btn_close_modal = document.querySelector('.btn-close-modal');
const modal_title = document.querySelector('.posts-header h1');

// App state
let user_data = [];

// Api List
const GET_USERS_URL = "https://jsonplaceholder.typicode.com/users";
const GET_USER_POSTS_URL = "https://jsonplaceholder.typicode.com/posts?userId=";

// Handle app event
const APP_EVENT = () => {
    const btn_get_user_posts = document.querySelectorAll('.btn-get-post');
    //===== Getting user post =====
    btn_get_user_posts.forEach(el => {
        el.addEventListener('click', (e) => {
            posts_body.innerHTML = loading_modal_widget;
            user_post_overlay.style.display = 'block';
            let user_id = e.target.getAttribute("user");
            modal_title.innerHTML = "Waitting...";
            fetch(GET_USER_POSTS_URL + user_id)
                .then((response) => response.json())
                .then((posts) => {
                    let selected_user = user_data.find(item => item.id == user_id);
                    modal_title.innerHTML = selected_user.name + " Posts";
                    let post_html_item = ``;
                    posts.forEach(post => {
                        post_html_item += `<div class="post-item">
                        <h2 class="post-title">${post.title}</h2>
                        <p class="post-desc">${post.body}</p>
                    </div>`;
                    });
                    posts_body.innerHTML = post_html_item;
                });
        });
    });
    // Closing modal
    btn_close_modal.addEventListener('click', (e) => {
        user_post_overlay.style.display = 'none';
    });
}

// Get user post
const getUserPosts = () => {
        fetch(GET_USERS_URL)
            .then((response) => response.json())
            .then((users) => {
                user_data = users;
                loading_widget.style.display = 'none';
                let user_html_item = ``;
                users.forEach(user => {
                    user_html_item += `<div class="user-item">
            <h1 class="names">${user.name}</h1>
            <span class="email">${user.email}</span>
            <button user="${user.id}" class="btn-get-post btn-primary">Get User's Posts</button>
            </div>`;
                });
                users_widget.innerHTML = user_html_item;
                // Wait user to render on UI
                setTimeout(() => { APP_EVENT(); }, 500)
            });
    }
    // Initial 
const INIT = () => {
    empty_widget.style.display = 'none';
    loading_widget.style.display = 'flex';
    users_widget.innerHTML = "";
    getUserPosts();
}


// ====== Initial call =======
INIT();