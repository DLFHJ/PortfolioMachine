const studentL = [
    {
        vorname: "Lara",
        nachname: "Falkenberg",
        major: "ID",
        link: "https://...",
        projekt1: {
            titel: "MomenTo.ly",
            shorttitel: "momentoly",
            tags: "UX Design, Game Design",
            year: "2021",
            cooperation: "Uni",
            cooperationName: "Hdm Stuttgart",
            team: "Pia Hanisch, Ilenia Quaiser",
            position: "1",
            content: [
                {
                    text: "The project ...",
                    position: "1",
                    fileformat: "png",
                },
                {
                    text: "The project ...",
                    position: "2",
                    fileformat: "png",
                },
            ],
        },
        projekt2: {
            titel: "Catch Me",
            shorttitel: "catchme",
            tags: "UX Design, Game Design",
            year: "2021",
            cooperation: "Uni",
            cooperationName: "FH Joanneum",
            team: "Ellen Dreßler, Leonie Dunke",
            position: "2",
            content: [
                {
                    text: "The project ...",
                    position: "1",
                    fileformat: "png",
                },
                {
                    text: "The project ...",
                    position: "2",
                    fileformat: "png",
                },
            ],
        },
    },
];

/**
 * insert student data to the webpage
 * @param {*} student 
 */
function insertStudent(student) {
    student.forEach((s) => {
        /* change the header */
        changeHeader(s.vorname, s.major);

        /* iterate over all projects */
        let projectCount = 0; for (let key in s) {
            if (key.startsWith('projekt')) {
                projectCount++;
                /* project data, index */
                insertProject(s[key], projectCount - 1);
            }
        }

    });
}

/**
 * inserts a specific project
 * @param {*} projekt 
 * @param {*} index 
 */
function insertProject(projekt, index) {
    var containerProjekt = document.createElement('div');
    containerProjekt.classList.add('container');
    document.body.appendChild(containerProjekt);

    const projectTitle = document.createElement('h3');
    projectTitle.textContent = `Projekt ${index + 1}: ${projekt.titel}`;
    containerProjekt.appendChild(projectTitle); const projectYear = document.createElement('p');
    projectYear.textContent = `Year: ${projekt.year}`;
    containerProjekt.appendChild(projectYear);

    /* iterate over content i.e. pages */
    projekt.content.forEach((contentItem) => {
        console.log("content: " + contentItem.position);
        insertProjectPage(containerProjekt, contentItem);
    });
}

/**
 * inserts project pages
 * @param {*} container containter to append to
 * @param {*} contentItem the current content item
 */
function insertProjectPage(container, contentItem) {
    const media = document.createElement('div');
    media.classList.add('p-media');
    container.appendChild(media);

    const text = document.createElement('p');
    text.textContent = contentItem.position + " : " + contentItem.text;
    text.classList.add("p-text");
    container.appendChild(text);
}

/* ----- */
insertStudent(studentL);
/* ----- */

// Function to check the file type 
function checkFileType(src) {
    const fileExtension = src.split('.').pop().toLowerCase(); return fileExtension;
}
/* ----- */
function changeHeader(studentName, studentMajor) {
    const pNameElement = document.querySelector('.p-name');
    pNameElement.textContent = studentName;
    const pMajorElement = document.querySelector('.p-major');
    pMajorElement.textContent = studentMajor;
}

function changeFooterProjectTitle(projectTitle) {
    const pTitleElement = document.querySelector('.p-title');
    pTitleElement.textContent = projectTitle;
}

function changeFooterPageNumber(pageNumber) {
    const pNumberElement = document.querySelector('.p-page-number');
    pNumberElement.textContent = pageNumber;
}



/* ------- old notes --------------------------------------------------------------- */

/* 


// Define the HTML block as a string
const htmlBlock = `
    <div class="card">
        <h2>Dynamic Content</h2>
        <p>This is a dynamically added block of HTML.</p>
        <img src="https://example.com/image.jpg" alt="Example Image">
        <button>Click Me</button>
    </div>
`;


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

 

    document.getElementById('main_content').appendChild(frag);
}

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


*/