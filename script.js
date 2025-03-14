document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (!username) {
        Swal.fire("Error", "Please enter your name", "error");
        return;
    }
    
    if (password !== "123456") {
        Swal.fire("Error", "Invalid password!", "error");
        return;
    }

    Swal.fire("Success", "Login successful!", "success").then(() => {
        document.getElementById("banner").style.display = "none";
        document.querySelector(".navbar").style.display = "flex";
        document.getElementById("vocabulary").style.display = "block";
        document.getElementById("faq").style.display = "block";
    });
});

function logout() {
    document.getElementById("banner").style.display = "block";
    document.querySelector(".navbar").style.display = "none";
    document.getElementById("vocabulary").style.display = "none";
    document.getElementById("faq").style.display = "none";
    Swal.fire("Logged out!", "You have been logged out.", "info");
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

// Fetch Vocabulary Lessons
async function fetchLessons() {
    let response = await fetch("https://openapi.programming-hero.com/api/levels/all");
    let data = await response.json();
    let lessonsDiv = document.getElementById("lessons");
    lessonsDiv.innerHTML = "";
    
    data.forEach(lesson => {
        let button = document.createElement("button");
        button.textContent = lesson.name;
        button.onclick = () => fetchWords(lesson.id);
        lessonsDiv.appendChild(button);
    });
}

// Fetch Words for Selected Lesson
async function fetchWords(lessonId) {
    let response = await fetch(`https://openapi.programming-hero.com/api/level/${lessonId}`);
    let data = await response.json();
    let wordsDiv = document.getElementById("words");
    wordsDiv.innerHTML = "";

    if (data.length === 0) {
        wordsDiv.innerHTML = "<p>No words found</p>";
        return;
    }

    data.forEach(word => {
        let wordCard = document.createElement("div");
        wordCard.innerHTML = `<h3>${word.word}</h3><p>${word.meaning}</p>`;
        wordsDiv.appendChild(wordCard);
    });
}

// Initialize Lessons on Page Load
fetchLessons();
