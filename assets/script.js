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

// Function to check if the user is on a mobile device
function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

// Show the notification if the user is on a mobile device
window.onload = function() {
  if (isMobile()) {
    document.getElementById('desktopNotification').style.display = 'block';
  }
};

// Close the notification when the user clicks the close button
document.getElementById('closeNotification').addEventListener('click', function() {
  document.getElementById('desktopNotification').style.display = 'none';
});


