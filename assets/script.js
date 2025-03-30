const SHEET_URL = "https://script.google.com/macros/s/AKfycbwfGb3d09QpMUNi_qWCX5q_9v69lEY2Q_bo1D7C89Gf4afd2XLbrVAEhHdEcj3pcifKQQ/exec";
let allQuestions = [];
let filteredQuestions = []; // Stores filtered & shuffled questions
let currentQuestionIndex = 0;
let userAnswers = {};

document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("dynamic-text");
    const words = ["Developer", "Tech Enthusiast", "Blogger", "AI Researcher"];
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        let displayText = currentWord.substring(0, letterIndex);

        textElement.innerHTML = displayText + "<span class='cursor'>|</span>";

        if (!isDeleting && letterIndex < currentWord.length) {
            letterIndex++;
            setTimeout(typeEffect, 100);
        } else if (isDeleting && letterIndex > 0) {
            letterIndex--;
            setTimeout(typeEffect, 50);
        } else {
            isDeleting = !isDeleting;
            wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
            setTimeout(typeEffect, 1500);
        }
    }

    typeEffect();
});

// ✅ Fetch questions from Google Sheets
async function fetchFilters() {
    try {
        document.getElementById("loading-overlay").style.display = "flex"; // Show overlay
        document.getElementById("main-content").classList.add("blur"); // Blur content

        let response = await fetch(SHEET_URL);
        let data = await response.json();

        if (!data.questions || data.questions.length === 0) {
            console.error("No questions received from Google Sheets.");
            return;
        }

        allQuestions = data.questions;
        let parts = getUniqueValues("Part");
        populateDropdown("part-filter", parts);
    } catch (error) {
        console.error("Error fetching filters:", error);
    } finally {
        document.getElementById("loading-overlay").style.display = "none"; // Hide overlay
        document.getElementById("main-content").classList.remove("blur"); // Unblur content
    }
}
// ✅ Get unique values from a specific column
function getUniqueValues(key) {
    return [...new Set(allQuestions.map(q => q[key]))].filter(value => value);
}

// ✅ Populate dropdown menus
function populateDropdown(elementId, values) {
    let select = document.getElementById(elementId);
    select.innerHTML = `<option value="">Select</option>`;
    values.forEach(value => {
        let option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });
}

// ✅ Update Unit dropdown based on selected Part
document.getElementById("part-filter").addEventListener("change", function () {
    let selectedPart = this.value;

    let units = [...new Set(allQuestions
        .filter(q => q.Part === selectedPart)
        .map(q => q.Unit)
    )].filter(unit => unit); 

    console.log("Selected Part:", selectedPart);
    console.log("Units for selected part:", units);

    populateDropdown("unit-filter", units);
    document.getElementById("topic-filter").innerHTML = `<option value="">Select</option>`;
});

// ✅ Update Topic dropdown based on selected Unit
document.getElementById("unit-filter").addEventListener("change", function () {
    let selectedPart = document.getElementById("part-filter").value;
    let selectedUnit = this.value;

    let topics = [...new Set(allQuestions
        .filter(q => q.Part === selectedPart && q.Unit === selectedUnit)
        .map(q => q.Topic)
    )].filter(topic => topic);

    console.log("Selected Unit:", selectedUnit);
    console.log("Topics for selected unit:", topics);

    populateDropdown("topic-filter", topics);
});

// ✅ Function to shuffle an array (Fisher-Yates Algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

// ✅ Fetch and display one question at a time
async function fetchQuestions() {
    let selectedPart = document.getElementById("part-filter").value.trim();
    let selectedUnit = document.getElementById("unit-filter").value.trim();
    let selectedTopic = document.getElementById("topic-filter").value.trim();

    filteredQuestions = allQuestions.filter(q =>
        q.Part?.toLowerCase() === selectedPart.toLowerCase() &&
        q.Unit?.toLowerCase() === selectedUnit.toLowerCase() &&
        q.Topic?.toLowerCase() === selectedTopic.toLowerCase()
    );

    if (!filteredQuestions.length) {
        document.getElementById("quiz-container").innerHTML = "<p>No questions available.</p>";
        document.getElementById("next-button").style.display = "none";
        document.getElementById("submit-button").style.display = "none";
        return;
    }

    shuffleArray(filteredQuestions); 
    currentQuestionIndex = 0;
    userAnswers = {};

    showQuestion(); 
}

// ✅ Show a single question at a time
function showQuestion() {
    let quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";

    if (currentQuestionIndex >= filteredQuestions.length) {
        document.getElementById("quiz-container").innerHTML = "<h3>Quiz completed! Click Submit to see your score.</h3>";
        document.getElementById("next-button").style.display = "none";
        document.getElementById("submit-button").style.display = "block";
        return;
    }

    let q = filteredQuestions[currentQuestionIndex];

    let questionBlock = document.createElement("div");
    questionBlock.innerHTML = `
        <p><strong>${currentQuestionIndex + 1}. ${q.Question}</strong></p>
        ${["A", "B", "C", "D"].map(opt => `
            <label class="option">
                <input type="radio" name="question" value="${q[`Option ${opt}`]}" ${userAnswers[q["Question ID"]] === q[`Option ${opt}`] ? "checked" : ""}>
                ${q[`Option ${opt}`]}
            </label><br>
        `).join("")}
    `;
    quizContainer.appendChild(questionBlock);

    document.getElementById("next-button").style.display = "block";
    document.getElementById("submit-button").style.display = "none";
}

// ✅ Next Question Logic
function nextQuestion() {
    let selectedAnswer = document.querySelector('input[name="question"]:checked');

    if (!selectedAnswer) {
        alert("⚠️ Please select an answer before proceeding!");
        return;
    }

    let currentQuestionId = filteredQuestions[currentQuestionIndex]["Question ID"];
    userAnswers[currentQuestionId] = selectedAnswer.value;

    currentQuestionIndex++;
    showQuestion();
}

// ✅ Submit user responses and calculate score
function submitQuiz() {
    let score = 0;
    let quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // Clear the container for results

    filteredQuestions.forEach((question, index) => {
        let questionId = String(question["Question ID"]).trim();
        let correctAnswer = String(question["Correct Answer"]).trim();
        let userAnswer = userAnswers[questionId] || "No Answer"; // Default if not answered

        let isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
        if (isCorrect) score++;

        let questionBlock = document.createElement("div");
        questionBlock.classList.add("result-block");

        questionBlock.innerHTML = `
            <p><strong>${index + 1}. ${question.Question}</strong></p>
            <p>Your Answer: <span class="${isCorrect ? "correct" : "incorrect"}">${userAnswer}</span></p>
            <p>Correct Answer: <span class="correct">${correctAnswer}</span></p>
            <hr>
        `;

        quizContainer.appendChild(questionBlock);
    });

    // Show final score
    document.getElementById("quiz-result").innerHTML = `<h3>Your Score: ${score} / ${filteredQuestions.length}</h3>`;

    // Hide next button
    document.getElementById("next-button").style.display = "none";
    document.getElementById("submit-button").style.display = "none";
}


function toggleMenu() {
    var nav = document.querySelector(".navigation");
    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
    }
}


document.addEventListener("DOMContentLoaded", function() {
    var currentPage = window.location.pathname.split("/").pop();
    var navLinks = document.querySelectorAll(".navigation-items a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    fetchFilters();  // Fetch data after the page loads
});



// ✅ Initialize the quiz system
fetchFilters();




// Enhanced 3D Background with Particles
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas'),
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Create particle system
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 2000;

const posArray = new Float32Array(particleCount * 3);
for(let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x3498db,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Add central object
const geometry = new THREE.IcosahedronGeometry(0.5, 0);
const material = new THREE.MeshStandardMaterial({
    color: 0x3498db,
    metalness: 0.7,
    roughness: 0.2
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.position.z = 0.001;

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    particlesMesh.rotation.y -= 0.001;
    
    renderer.render(scene, camera);
}

animate();

// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    const menu = document.querySelector('.md\\:flex.space-x-8');
    menu.classList.toggle('hidden');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("dynamic-text");
    const words = ["Developer", "Tech Enthusiast", "Blogger", "AI Researcher"];
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        let displayText = currentWord.substring(0, letterIndex);

        textElement.innerHTML = displayText + "<span class='cursor'>|</span>";

        if (!isDeleting && letterIndex < currentWord.length) {
            letterIndex++;
            setTimeout(typeEffect, 100);
        } else if (isDeleting && letterIndex > 0) {
            letterIndex--;
            setTimeout(typeEffect, 50);
        } else {
            isDeleting = !isDeleting;
            wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
            setTimeout(typeEffect, 1500);
        }
    }

    typeEffect();
});

document.addEventListener("DOMContentLoaded", function () {
    const img = document.querySelector(".hero img");

    // After 3 seconds, switch to the pulsating glow effect
    setTimeout(() => {
        img.style.animation = "borderGlow 1.5s infinite alternate";
    }, 3000);
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);

    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('success-message').classList.remove('hidden');
        form.reset();
    })
    .catch(error => console.error('Error:', error));
});

document.addEventListener("DOMContentLoaded", function () {
    const services = document.querySelectorAll(".service");
    services.forEach(service => {
        service.addEventListener("mouseover", function () {
            this.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.2)";
        });
        service.addEventListener("mouseleave", function () {
            this.style.boxShadow = "none";
        });
    });
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);

    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('success-message').classList.remove('hidden');
        form.reset();
    })
    .catch(error => console.error('Error:', error));
});
