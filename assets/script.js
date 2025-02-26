const SHEET_URL = "https://script.google.com/macros/s/AKfycbwfGb3d09QpMUNi_qWCX5q_9v69lEY2Q_bo1D7C89Gf4afd2XLbrVAEhHdEcj3pcifKQQ/exec";
let allQuestions = [];
let filteredQuestions = []; // Stores filtered & shuffled questions
let currentQuestionIndex = 0;
let userAnswers = {};

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
