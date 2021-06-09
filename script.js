const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
let count = 5;
const apiKey = 'zt6z2vcXtvt-bm1ySQpJwXGFf5FhcCaVjHUQtAoE_Bk';
const contentGenre = 'music';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${contentGenre}`;

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded == totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready= ',ready);
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${contentGenre}`;
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos(){
    totalImages += photosArray.length;
    console.log('Total Images =',totalImages);
    // Run function for object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each image is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside our imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos(){
    try{
            const response = await fetch(apiUrl);
            photosArray = await response.json();
            displayPhotos();
    }
    catch (error){
        // Catch Error Here
        alert('API Error');
    }
}

// Check to see if scrolling is near bottom of page- if so, load more photos
// Window is parent of document, grandparent of body
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        ready = false;
        console.log('loading more');
        getPhotos();
    }
})

// On Load
getPhotos();