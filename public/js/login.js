function toggleForm() {
    var loginForm = document.getElementById("login-form");
    var signupForm = document.getElementById("signup-form");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    }
}

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
});

document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault();
});
