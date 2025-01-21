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
        changeHeader(s.vorname + " " + s.nachname, s.major);
        insertStartPage(s);

        /* iterate over all projects */
        let projectCount = 0; for (let key in s) {
            if (key.startsWith('projekt')) {
                projectCount++;
                /* project data, index */
                insertProject(s[key], projectCount - 1, s);
            }
        }
    });
}

/**
 * inserts a specific project
 * @param {*} projekt 
 * @param {*} index 
 */
function insertProject(projekt, index, student) {
    var projectContainer = document.createElement('div');
    projectContainer.classList.add('p-projectContainer');
    document.body.appendChild(projectContainer);



    /* iterate over content i.e. pages */
    projekt.content.forEach((contentItem) => {
        console.log("content: " + contentItem.position);
        insertProjectPage(projectContainer, contentItem, student, projekt);
    });
}

/**
 * inserts project pages
 * @param {*} container containter to append to
 * @param {*} contentItem the current content item
 */
function insertProjectPage(container, contentItem, student, projekt) {
    const pageContainer = document.createElement('div');
    pageContainer.classList.add('p-pageContainer');
    container.appendChild(pageContainer);

    /* --- */
    if (contentItem.position == 1) {
        const titleHeading = document.createElement('div');
        titleHeading.classList.add('p-titleHeading');
        pageContainer.appendChild(titleHeading);

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = `Projekt ${projekt.position}: ${projekt.titel}`;
        projectTitle.classList.add('p-title');
        titleHeading.appendChild(projectTitle);

        const projectSubtitle = document.createElement('div');
        projectSubtitle.classList.add('p-subtitle');
        titleHeading.appendChild(projectSubtitle);

        /**
         * TODO:
         * DONE refactor naming 
         * !!! check length and set e.g. team (instead of all members)
         */
        const projecCooperation = document.createElement('p');
        projecCooperation.textContent = `${projekt.cooperationName}`;
        projecCooperation.classList.add('p-tag');
        projectSubtitle.appendChild(projecCooperation);

        /* teamwork or solo */
        const projectTeam = document.createElement('p');
        projectTeam.classList.add('p-tag')
        if (projekt.team && projekt.team.trim() !== '') {
            projectTeam.textContent = "Teamarbeit";
        } else {
            projectTeam.textContent = "Solo";
        }
        projectSubtitle.appendChild(projectTeam);

        const projectYear = document.createElement('p');
        projectYear.textContent = `Year: ${projekt.year}`;
        projectYear.classList.add('p-tag')
        projectSubtitle.appendChild(projectYear);


    }
    /* --- */


    /* set img/video for media */
    let contentItemFileFormat;
    /* !!! maybe check || jpg || dmv || etc. */
    if (contentItem.fileformat == "png") {
        contentItemFileFormat = 'img';
    } else if (contentItem.fileformat == "mp4") {
        contentItemFileFormat = 'video';
    }

    const mediaContainer = document.createElement('div');
    mediaContainer.classList.add('p-mediaContainer');
    pageContainer.appendChild(mediaContainer);

    const media = document.createElement(contentItemFileFormat);

    media.src = "media/Sonolux Speculative Future/LAẞLBERGER_SONOLUX_IMAGE-3.png";
    let pathX = `${student.nachname}_${projekt.shorttitel}_${projekt.position}_${contentItem.position}.${contentItemFileFormat}`;
    console.log(pathX);

    media.classList.add('p-media');

    mediaContainer.appendChild(media);
    /* apply different class for landscape/portrait */
    media.onload = function () {
        const width = media.naturalWidth;
        const height = media.naturalHeight;
        if (width > height) {
            media.classList.add("p-landscape-" + contentItemFileFormat);
            text.classList.add("p-landscape-text-" + contentItemFileFormat);
        } else {
            media.classList.add('p-portrait-' + contentItemFileFormat);
            text.classList.add("p-portrait-text-" + contentItemFileFormat);
        }
    };

    const text = document.createElement('p');
    text.textContent = contentItem.position + " : " + contentItem.text;

    container.appendChild(text);
}

function insertStartPage(student) {
    const startPage = document.createElement('div');
    startPage.classList.add('p-startPage');
    const profilePicture = document.createElement('img');
    profilePicture.classList.add('p-profilePicture');
    const name = document.createElement('p');
    name.textContent = student.vorname + " " + student.nachname;
    name.classList.add('p-name');
    const majorText = document.createElement('p');
    majorText.textContent = student.major;
    majorText.classList.add('p-major');
    const majorImg = document.createElement('img');
    majorImg.classList.add('p-majorImg');

    document.body.appendChild(startPage);
    startPage.appendChild(profilePicture);
    startPage.appendChild(name);
    startPage.appendChild(majorText);
    startPage.appendChild(majorImg);
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

// ----------------------------------------------------------------

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dynamic Page Number</title>
    <style>
        .page {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
            border: 1px solid #000;
            margin: 10px 0;
        }
        .page-number {
            position: fixed;
            top: 10px;
            right: 10px;
            font-size: 1.5rem;
        }
    </style>
</head>
<body>
    <div class="page-number">Page: 1</div>
    <div class="page" id="page1">Page 1</div>
    <div class="page" id="page2">Page 2</div>
    <div class="page" id="page3">Page 3</div>
    <div class="page" id="page4">Page 4</div>

    <script>
        const pages = document.querySelectorAll('.page');
        const pageNumberElement = document.querySelector('.page-number');

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Adjust this value to suit your needs
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const pageId = entry.target.id;
                    const pageIndex = Array.from(pages).indexOf(entry.target) + 1;
                    pageNumberElement.textContent = `Page: ${pageIndex}`;
                }
            });
        }, options);

        pages.forEach(page => {
            observer.observe(page);
        });
    </script>
</body>
</html>
*/

/* check performance */

// Create a performance observer to monitor loading metrics
const performanceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
    });
});

// Start observing different types of performance metrics
performanceObserver.observe({ entryTypes: ['resource', 'element'] });

// Function to measure loading time for specific elements
function measureLoadTime(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element, index) => {
        const startTime = performance.now();

        // Handle different types of media
        if (element instanceof HTMLVideoElement) {
            element.addEventListener('loadeddata', () => {
                const loadTime = performance.now() - startTime;
                console.log(`Video ${index + 1} load time: ${loadTime.toFixed(2)}ms`);
            });
        } else if (element instanceof HTMLImageElement) {
            if (element.complete) {
                const loadTime = performance.now() - startTime;
                console.log(`Image ${index + 1} load time: ${loadTime.toFixed(2)}ms`);
            } else {
                element.addEventListener('load', () => {
                    const loadTime = performance.now() - startTime;
                    console.log(`Image ${index + 1} load time: ${loadTime.toFixed(2)}ms`);
                });
            }
        } else if (element instanceof HTMLIFrameElement) {
            element.addEventListener('load', () => {
                const loadTime = performance.now() - startTime;
                console.log(`IFrame ${index + 1} load time: ${loadTime.toFixed(2)}ms`);
            });
        }

        // Add error handling
        element.addEventListener('error', () => {
            console.error(`Error loading element ${index + 1}`);
        });
    });
}

// Function to measure total page load metrics
function measurePageMetrics() {
    window.addEventListener('load', () => {
        // Navigation timing metrics
        const pageNav = performance.getEntriesByType('navigation')[0];
        console.log({
            'Total Page Load Time': `${pageNav.duration.toFixed(2)}ms`,
            'DOM Content Loaded': `${pageNav.domContentLoadedEventEnd - pageNav.domContentLoadedEventStart}ms`,
            'First Contentful Paint': `${performance.getEntriesByType('paint')[0].startTime.toFixed(2)}ms`
        });

        // Resource timing for all resources
        const resources = performance.getEntriesByType('resource');
        resources.forEach(resource => {
            console.log(`${resource.name}: ${resource.duration.toFixed(2)}ms`);
        });
    });
}

/* --- */

// Measure specific types of media
measureLoadTime('video');  // for videos
measureLoadTime('img');    // for images
measureLoadTime('iframe'); // for iframes

// Measure overall page metrics
measurePageMetrics();

//var loadTime = window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart;
//console.log("load time: " + loadTime);
console.log(window.performance);

