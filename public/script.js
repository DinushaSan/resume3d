// Turn pages when click next or prev buttons
const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {
        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);

        if(pageTurn.classList.contains('turn')) {
            pageTurn.classList.remove('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index;
            }, 500)
        } else {
            pageTurn.classList.add('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index;
            }, 500)
        }
    }
})

// Contact me button when clicked
const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.btn.contact-me');

contactMeBtn.onclick = () => {
    pages.forEach((page, index) => {
        setTimeout(() => {
            page.classList.add('turn');

            setTimeout(() => {
                page.style.zIndex =  20 + index;
            }, 500)
        }, (index + 1) * 200 + 100)
    })
}

// Create reverse index function
let totalPages = pages.length;
let pageNumber = 0;

function reverseIndex() {
    pageNumber--;
    if(pageNumber < 0) {
        pageNumber = totalPages - 1;
    }
}

// Back profile button when clicked

const backProfileBtn = document.querySelector('.back-profile');

backProfileBtn.onclick = () => {
    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove('turn');

            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index;
            }, 500)
        }, (index + 1) * 200 + 100)
    })
}

// Opening animation
const coverRight = document.querySelector('.cover.cover-right');
const pageLeft = document.querySelector('.book-page.page-left');

// Opening animation (cover right animation)
setTimeout(() => {
    coverRight.classList.add('turn');
}, 2100)

setTimeout(() => {
    coverRight.style.zIndex = -1;
}, 2800)

// Opening animation (page left or profile page animation)
setTimeout(() => {
    pageLeft.style.zIndex = 20;
}, 3200)

// Opening animation (all page right animation)
pages.forEach((_, index) => {
    setTimeout(() => {
        reverseIndex();
        pages[pageNumber].classList.remove('turn');

        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].style.zIndex = 10 + index;
        }, 500)
    }, (index + 1) * 200 + 2100)
})

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent default form submission

        // Get form data
        const formData = new FormData(this);

        // Send form data using fetch
        fetch('/send', {
            method: 'POST',
            body: new URLSearchParams(formData),  // Convert form data to URL-encoded format
        })
        .then(response => response.json())
        .then(data => {
            const responseMessage = document.getElementById('responseMessage');
            
            if (data.message) {
                responseMessage.textContent = data.message;
                responseMessage.style.display = 'block';
                responseMessage.style.color = 'green';
                document.getElementById('contactForm').reset();  // Clear form on success
            } else if (data.error) {
                responseMessage.textContent = data.error;
                responseMessage.style.display = 'block';
                responseMessage.style.color = 'red';
            }
        })
        .catch(error => {
            const responseMessage = document.getElementById('responseMessage');
            responseMessage.textContent = "An error occurred. Please try again.";
            responseMessage.style.display = 'block';
            responseMessage.style.color = 'red';
        });
    });
});
