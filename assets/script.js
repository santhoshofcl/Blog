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

function checkScreenWidth() {
  let screenWidth = window.innerWidth;
  
  if (screenWidth < 1024) {
    // Show modal and blur content
    document.getElementById("myModal").style.display = "block";
    document.getElementById("content").style.filter = "blur(5px)";
  } else {
    // Hide modal and remove blur
    document.getElementById("myModal").style.display = "none";
    document.getElementById("content").style.filter = "none";
  }
}

// Run on page load and resize
window.onload = checkScreenWidth;
window.onresize = checkScreenWidth;
