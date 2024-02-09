const signUp = document.getElementById("signup");
const signIn = document.getElementById("signIn");
const container = document.getElementById("container");
const signUpBtn = document.getElementById("signUpBtn");
const signInBtn = document.getElementById("signInBtn");

signUp.addEventListener("click",()=>{
    container.classList.add("right-panel-active")
});