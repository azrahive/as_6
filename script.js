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
    });
});

function logout() {
    document.getElementById("banner").style.display = "block";
    document.querySelector(".navbar").style.display = "none";
    Swal.fire("Logged out!", "You have been logged out.", "info");
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}
