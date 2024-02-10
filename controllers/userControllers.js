const path = require("path");
const User = require("../models/userModels");

exports.getLoginPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, "../", "public", "views", "login.html"));
};

exports.postUserSignUp = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ where: { email: email } })
        .then((user) => {
            if (user) {
                res.send(
                    `<script>alert('This email is already taken. Please try another one!');window.location.href='/'</script>`
                );
            } else {
                User.create({
                    name: name,
                    email: email,
                    password: password,
                });
            }
        })
        .then(() => {
            res.status(200).send('User signed up successfully');
        })
        .catch((err) => console.log(err));
};

exports.postUserLogin = (req,res,next) => {
    const email = req.body.loginEmail;
    const password = req.body.loginPassword;

    User.findOne({where:{email:email}})
    .then((user)=>{
       if(user) {
        if(user.password==password){
            res
            .status(200)
            .send(
                `<script>alert('Login Successful!');window.location.href='/'</script>`
            )
        }
        else {
            res.status(401).send('Wrong email or password')
           }
       } else {
        res.status(404).send("No user found") 
       } 
      
    })
};
