// Replace with your Google Apps Script Web App URL 
let webAppURL = 'https://script.google.com/macros/s/AKfycbzXGPtMGQ6RR6vubI0h229qj9xmkI04G6qhb9I8odNUxaCbbvF9XN9Xfb-pl7QKmG6g/exec';



/* Insert new click data in the google sheet */
function insertNewClick(columnName) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbyU-p7z3tHF0I1K0GCmjcRG3CaG0NPkGyMPTvhlGPISxwIYrt6ueD7O2iHSza9SPOP3/exec";

    // Trim the column name before passing it
    fetch(`${scriptURL}?columnName=${encodeURIComponent(columnName.trim())}`)
        .then(response => response.text())
        .then(data => console.log("Response:", data))
        .catch(error => console.error("Error:", error));
}










// Fetch data from Google Sheets Web App
async function fetchAndDisplayProduct() {
    try {
        // Fetch the data from the Web App
        let response = await fetch(webAppURL);
        let data = await response.json();



        // Update the main product image
        let mainImageURL = data[1][0]; // Column 1 (index 0), Row 2 (index 1)
        let mainImageElement = document.getElementById('main_image_id');
        if (mainImageElement) {
            mainImageElement.src = mainImageURL;
        }

        // Update the product thumbnails
        let thumbnailContainer = document.querySelector('.thumbnail_container');
        if (thumbnailContainer) {
            thumbnailContainer.innerHTML = ''; // Clear existing thumbnails

            for (let i = 1; i < data.length; i++) {
                let thumbnailURL = data[i][0]; // Column 1 (index 0), subsequent rows
                if (thumbnailURL) { // Check if the URL is not empty
                    let thumbnail = document.createElement('img');
                    thumbnail.src = thumbnailURL;
                    thumbnail.alt = `Product Thumbnail ${i}`;
                    thumbnail.className = 'thumbnail';
                    thumbnail.onclick = () => changeImage(thumbnailURL); // Add click functionality
                    thumbnailContainer.appendChild(thumbnail);
                }
            }
        }



        let productName = data[1][1]; // Column 2 (index 1), Row 2 (index 1)
        let productDescription = data[1][2]; // Column 3 (index 2), Row 2 (index 1)
        let ProductCurrentPrice = data[1][3]; // Column 4 (index 3), Row 2 (index 1)
        let ProductOldPrice = data[1][4]; // Column 5 (index 4), Row 2 (index 1)
        let ProductPercentageOff = data[1][5]; // Column 6 (index 5), Row 2 (index 1)
        let ProductCallToAction = data[1][6]; // Column 7 (index 6), Row 2 (index 1)
        let ProductAffiliateLink = data[1][7]; // Column 8 (index 7), Row 2 (index 1)

        document.getElementById('product_name_id').innerText = productName;
        document.getElementById('product_description_id').innerText = productDescription;
        document.getElementById('product_current_price_id').innerText = `Only ${ProductCurrentPrice}`;
        document.getElementById('product_old_price_id').innerText = ProductOldPrice;
        document.getElementById('product_percentage_off_id').innerText = ProductPercentageOff;
        document.getElementById('product_call_to_action_id').innerText = ProductCallToAction;

        // Add a click event listener to the button
        document.getElementById('product_call_to_action_id').addEventListener("click", function () {

            /* Insert a new click data to the google sheet */
            insertNewClick('affiliate single 4');

            window.open(ProductAffiliateLink, '_blank');
        });





        let websiteNameTitle = data[1][10]; // Column 11 (index 9), Row 2 (index 1)
        let websiteDescription = data[1][11]; // Column 12 (index 10), Row 2 (index 1)

        document.getElementById('website_name_id').innerText = `Welcome To ${websiteNameTitle}`;
        document.getElementById('website_description_id').innerText = websiteDescription;
        document.getElementById('footer_copyright_id').innerText = websiteNameTitle;




        // Update social media links
        let instagramLink = data[1][13]; // Column 14 (index 13), Row 2 (index 1)
        let tiktokLink = data[1][14]; // Column 15 (index 14), Row 2 (index 1)
        let youtubeLink = data[1][15]; // Column 16 (index 15), Row 2 (index 1)

        // Update the href attributes of the social media links
        document.getElementById('instagram_url_link_id').parentElement.href = instagramLink;
        document.getElementById('tiktok_url_link_id').parentElement.href = tiktokLink;
        document.getElementById('youtube_url_link_id').parentElement.href = youtubeLink;



        /* Check the website expire date */
        checkWebsiteTimeout();

        // Make the body visible after loading content
        document.body.style.opacity = '1';

    } catch (error) {
        window.location.reload();
    }
}


/* Run the 'fetchAndDisplayProducts' once the page is loaded */
document.addEventListener("DOMContentLoaded", fetchAndDisplayProduct);














/* Function to change the product image
 */function changeImage(src) {
    document.getElementById('main_image_id').src = src;
}

// Fullscreen image functionality
document.getElementById('main_image_id').addEventListener('click', function () {
    const mainImageSrc = this.src;

    // Set the full-screen image source
    const fullscreenImage = document.getElementById('fullscreen_image');
    fullscreenImage.src = mainImageSrc;

    // Show the overlay with fade-in effect
    const overlay = document.getElementById('fullscreen_overlay');
    overlay.classList.add('visible');
});

// Close the overlay on click or pressing "Esc"
document.getElementById('fullscreen_overlay').addEventListener('click', function () {
    this.classList.remove('visible');
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.getElementById('fullscreen_overlay').classList.remove('visible');
    }
});









/* Function for all elements when scrolling */
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".animate_on_scroll");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            // Check if the element is intersecting and hasn't been animated before
            if (entry.isIntersecting && !entry.target.classList.contains("animation_done")) {
                entry.target.classList.add("intro_animation", "animation_done");
                entry.target.classList.remove("outro_animation");
            } else if (!entry.isIntersecting && !entry.target.classList.contains("animation_done")) {
                entry.target.classList.remove("intro_animation");
                entry.target.classList.add("outro_animation");
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});







/* Check the website expire date */
function checkWebsiteTimeout() {
    // Get the date string from the element with id "website_time_out_date_a_id"
    let timeoutDateStr = document.getElementById('website_time_out_date_a_id').innerText;

    // Parse the date string into a usable format
    let [year, month, day] = timeoutDateStr.split('-').map(Number);
    let timeoutDate = new Date(2000 + year, month - 1, day); // Adjust for 2-digit year assumption

    // Get the current date without time
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Compare the current date with the timeout date
    if (currentDate > timeoutDate) {
        // Set body display to ''
        document.body.innerHTML = '';

        // Create an h1 element and style it
        let message = document.createElement('h1');
        message.innerText = `The Website Needs To Be Renewal\n${timeoutDateStr}`;
        message.style.width = '100%';
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.textAlign = 'center';
        message.style.fontSize = '2vmax';
        message.style.color = 'red';
        message.style.backgroundColor = 'white';
        message.style.padding = '20px';
        message.style.border = '2px solid red';

        // Append the message to the body
        document.body.appendChild(message);
        document.body.style.display = ''; // Make the message visible
    }
}
