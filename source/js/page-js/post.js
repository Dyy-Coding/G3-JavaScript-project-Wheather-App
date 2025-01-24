document.addEventListener('DOMContentLoaded', () => {
    // Display stored posts on page load
    displayStoredPosts();
});

// Function to store post data in localStorage
function storePostData(title, details, mediaFile) {
    const postData = {
        id: Date.now(), // Unique ID for the post
        title: title,
        details: details,
        media: mediaFile ? URL.createObjectURL(mediaFile) : null, // Create a temporary URL for media
        timestamp: new Date().toISOString(),
    };

    // Retrieve existing posts from localStorage
    const existingPosts = JSON.parse(localStorage.getItem('dataPost')) || [];
    existingPosts.push(postData);

    // Update localStorage
    localStorage.setItem('dataPost', JSON.stringify(existingPosts));

    // Update the UI
    displayStoredPosts();
}

// Function to display stored posts
function displayStoredPosts() {
    const storedPosts = JSON.parse(localStorage.getItem('dataPost')) || [];
    const postsContainer = document.getElementById('postsContainer');

    postsContainer.innerHTML = ''; // Clear existing posts

    storedPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.details}</p>
            <p>${new Date(post.timestamp).toLocaleString()}</p>
            ${post.media ? 
                (post.media.endsWith('.mp4') ? 
                    `<video controls src="${post.media}" style="max-width: 100%;"></video>` : 
                    `<img src="${post.media}" alt="Post Media" style="max-width: 100%; border-radius: 5px;">`) : 
                ''}
            <button class="btn delete-btn" data-id="${post.id}">Delete</button>
        `;
        postsContainer.appendChild(postElement);
    });

    // Attach event listeners for delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const postId = e.target.dataset.id;
            deletePost(postId);
        });
    });
}

// Function to delete a post
function deletePost(id) {
    const storedPosts = JSON.parse(localStorage.getItem('dataPost')) || [];
    const updatedPosts = storedPosts.filter(post => post.id !== parseInt(id));

    // Update localStorage
    localStorage.setItem('dataPost', JSON.stringify(updatedPosts));

    // Update the UI
    displayStoredPosts();
}

// Function to preview post
function previewPost(title, details, mediaFile) {
    const previewContainer = document.getElementById('previewContainer');

    previewContainer.innerHTML = ''; // Clear previous preview

    const previewElement = document.createElement('div');
    previewElement.className = 'post-preview';
    previewElement.innerHTML = `
        <h3>${title}</h3>
        <p>${details}</p>
        ${mediaFile ? 
            (mediaFile.type.startsWith('video/') ? 
                `<video controls src="${URL.createObjectURL(mediaFile)}" style="max-width: 100%;"></video>` : 
                `<img src="${URL.createObjectURL(mediaFile)}" alt="Preview Media" style="max-width: 100%; border-radius: 5px;">`) : 
            ''}
    `;
    previewContainer.appendChild(previewElement);
}

// Form submission handling
document.getElementById('postForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const title = document.getElementById('post-title').value;
    const details = document.getElementById('post-details').value;
    const mediaFile = document.getElementById('post-media').files[0];

    storePostData(title, details, mediaFile);

    // Reset the form
    this.reset();
    document.getElementById('previewContainer').innerHTML = ''; // Clear preview after submission
});

// Add preview event listener
document.getElementById('postForm').addEventListener('input', function () {
    const title = document.getElementById('post-title').value;
    const details = document.getElementById('post-details').value;
    const mediaFile = document.getElementById('post-media').files[0];

    previewPost(title, details, mediaFile);
});
