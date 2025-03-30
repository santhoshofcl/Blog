const API_URL = "https://script.google.com/macros/s/AKfycbxJ1LX85hu0YKwQVW-UDttKJSzICQMuk5hkVr1u0HYtYJ-Nri7Fxq3H4Ix70ZifJalyHA/exec";

async function fetchPosts() {
    try {
        document.getElementById("loading-overlay").style.display = "flex"; // Show loader

        let response = await fetch(API_URL);
        let posts = await response.json();
        window.allPosts = posts;
        filterAndDisplayPosts(posts);
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        document.getElementById("blog-container").innerHTML = "<p>Failed to load blog posts. Please try again later.</p>";
    } finally {
        document.getElementById("loading-overlay").style.display = "none"; // Hide loader
    }
}

function filterAndDisplayPosts(posts) {
    let container = document.getElementById("blog-container");
    container.innerHTML = "";
    let searchQuery = document.getElementById("searchBox").value.toLowerCase();
    
    let now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    now = new Date(now);

    // Filter posts by timestamp and sort them by date (newest first)
    let visiblePosts = posts
        .filter(post => new Date(post.timestamp) <= now)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sorting here ✅

    if (searchQuery) {
        visiblePosts = visiblePosts.filter(post => 
            post.title.toLowerCase().includes(searchQuery) || 
            post.content.toLowerCase().includes(searchQuery)
        );
    }

    if (visiblePosts.length === 0) {
        container.innerHTML = "<p>No matching posts found.</p>";
        return;
    }

    visiblePosts.forEach((post, index) => {
        let imageHTML = post.image ? `<img src="${post.image}" alt="Post Image" class="post-image">` : "";
        let videoHTML = post.video ? `<iframe src="${post.video}" class="post-video" allowfullscreen></iframe>` : "";
        let formattedContent = markdownToHTML(post.content);

        let postHTML = `
            <div class="blog-post" onclick="showFullPost(${index})">
                ${imageHTML}
                <h2>${post.title}</h2>
                <div class="preview-content">${formattedContent.substring(0, 200)}...</div>
                <p class="tags">Tags: ${post.tags ? post.tags.join(", ") : "No tags"}</p>
                <small>Published on: ${new Date(post.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</small>
                ${videoHTML}
            </div>
        `;
        container.innerHTML += postHTML;
    });
}
document.getElementById("searchBox").addEventListener("input", function () {
    filterAndDisplayPosts(window.allPosts);
});

function showFullPost(index) {
    let post = window.allPosts[index];

    let imageHTML = post.image ? `<img src="${post.image}" alt="Post Image" class="post-image">` : "";
    let videoHTML = post.video ? `<iframe src="${post.video}" class="post-video" allowfullscreen></iframe>` : "";
    let formattedContent = markdownToHTML(post.content);

    let fullPostHTML = `
        <div class="full-post">
            ${imageHTML}
            <h1>${post.title}</h1>
            <div>${formattedContent}</div>
            <p class="tags">Tags: ${post.tags ? post.tags.join(", ") : "No tags"}</p>
            <small>Published on: ${new Date(post.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</small>
            ${videoHTML}
            <br><button onclick="goBack()">Go Back</button>
        </div>
    `;

    document.getElementById("blog-container").innerHTML = fullPostHTML;
}

function markdownToHTML(markdown) {
    return decodeURIComponent(markdown)
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/(?:\r\n|\r|\n)/g, "<br>");
}

function goBack() {
    fetchPosts();
}


fetchPosts();