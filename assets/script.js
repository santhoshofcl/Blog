let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

function updateNavLinks() {
    let scrollPosition = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150; 
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (scrollPosition >= offset && scrollPosition < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(id)) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateNavLinks);

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Function to check if the screen is below a desktop width (e.g., less than 1024px)
function checkDesktopMode() {
  const screenWidth = window.innerWidth;
  const modal = document.getElementById('desktopModal');
  const content = document.getElementById('content');

  // Toggle visibility based on screen width
  if (screenWidth < 640) {
    modal.style.display = 'block';  // Show the modal
    content.style.display = 'none'; // Hide the website content
  } else {
    modal.style.display = 'none';   // Hide the modal
    content.style.display = 'block'; // Show the website content
  }
}

// Run the check when the window loads and when it's resized
window.onload = checkDesktopMode;
window.onresize = checkDesktopMode;
