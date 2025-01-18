// Define the HTML block as a string
const htmlBlock = `
    <div class="card">
        <h2>Dynamic Content</h2>
        <p>This is a dynamically added block of HTML.</p>
        <img src="https://example.com/image.jpg" alt="Example Image">
        <button>Click Me</button>
    </div>
`;

// Create a temporary container element
const tempContainer = document.createElement('div');

// Set the innerHTML of the temporary container to the HTML block
tempContainer.innerHTML = htmlBlock;

// Append the contents of the temporary container to the actual container
document.getElementById("containerasd").appendChild(tempContainer.firstElementChild);

// !
var post = document.createElement('p');
post.className = 'post';
post.textContent = "asdasdsad";
document.getElementById("containerasd").appendChild(post);

/* ----- */
insertPage();

// Function to check the file type 
function checkFileType(src) {
    const fileExtension = src.split('.').pop().toLowerCase(); return fileExtension; 
}
/* ----- */
function changeHeader() {

}

function changeFooter() {

}

/**
 * optional param for heading
 * check for media type
 */
function insertPage() {
    var container = document.createElement('div');
    container.className = 'container';

    var page = document.createElement('div');
    page.className = 'page';
    container.appendChild(page);
    var media = document.createElement('div');
    media.className = 'media';
    page.appendChild(media);
    var text = document.createElement('p');
    text.className = 'text';
    page.appendChild(text);

    // add to document body
    document.body.appendChild(container);
}
/* ----- */

var post = document.createElement('div');
post.className = 'post';
var postHeader = document.createElement('div');
postHeader.className = 'post_header';
var postTitle = document.createElement('div');
postTitle.className = 'post_title';
postTitle.tectContent = json.title;
//more code
postHeader.appendChild(postTitle);
//more code
document.appendChild(postHeader);

function postEl(json) { // create a function for the POST element
    var post = document.createElement('div');
    post.className = 'post';
    var postHeader = document.createElement('div');
    postHeader.className = 'post_header';
    var postTitle = document.createElement('div');
    postTitle.className = 'post_title';
    postTitle.tectContent = json.title;
    //more code
    postHeader.appendChild(postTitle);
    //more code
    post.appendChild(postHeader);
    return post;
}

function appendPosts() { // append each post to a fragment. and then to the main
    var frag = document.createDocumentFragment();

    frag.appendChild(postEl(/*jsonPost*/));

    document.getElementById('main_content').appendChild(frag);
}