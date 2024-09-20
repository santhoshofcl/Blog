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

  // If the screen width is less than 1024px, show the modal and blur the content
  if (screenWidth < 1024) {
    modal.style.display = 'block';  // Show the modal
    content.classList.add('blur');  // Apply blur effect to content
  } else {
    modal.style.display = 'none';   // Hide the modal
    content.classList.remove('blur');  // Remove blur effect from content
  }
}

// Run the check when the window loads and when it's resized
window.onload = checkDesktopMode;
window.onresize = checkDesktopMode;
