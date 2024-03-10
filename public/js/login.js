const signUp = document.getElementById( "signUp" );
const signIn = document.getElementById( "signIn" );
const container = document.getElementById( "container" );
const signUpBtn = document.getElementById("signUpBtn");


const loginEmail = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("loginBtn");

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

async function login() {


    try {
     
        const loginDetails = {
            loginEmail: loginEmail.value,
            loginPassword: loginPassword.value
        };
    
      const res =  await axios.post("http://localhost:3000/user/login", loginDetails);
      
       if (res.status===200) {
        
        alert(res.data.message);
        localStorage.setItem('user', JSON.stringify(res.data));
        window.location.replace("/homePage"); 
        //window.location.href= "/homePage";
        

       }

    } catch(error) {
 
        if (error.response) {
            const errorMessage = error.response.data.message;
            alert(errorMessage);
        } else {
            alert("Something went wrong. Please try after sometime");
        }
    }
       
}

loginBtn.addEventListener("click", login); 