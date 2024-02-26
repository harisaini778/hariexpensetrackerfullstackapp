const path = require("path");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAccessToken(id, email, isPremiumUser){
    return jwt.sign(
        {
            userId : id, email:email
        },
        "kjhkjhjchaskjchaijcaknjshdjshheifewyeyewfkwuefgwj"
    );
};

exports.generateAccessToken = generateAccessToken;

exports.isPremiumUser = (req,res,next) => {
    if(req.user.isPremiumUser) {
        return res.json({isPremiumUser : true});
    }
}

// function redirectToHomepage(res) {
//  res.redirect("/homePage");
// }

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
                res.status(409).send(
                    `<script>alert('This email is already taken. Please try another one!');window.location.href='/'</script>`
                );
            } else {
 
                bcrypt.hash(password,10, async (err,hash)=>{
                await User.create({
                    name: name,
                    email: email,
                    password: hash,
                });
                })
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
 
        bcrypt.compare(password,user.password,(err,result)=>{
            if(err){
                return  res.status(401).json({message:"Invalid Email or Password"});
            }
            if(result===true){
                res
                .status(200).json({
                    success:true,
                    message:"Login Successful!",
                    token:generateAccessToken(user.id,user.email),
                });
                // redirectToHomepage(res);
            }
        })  
       } else{
        res.status(404).send("No user found") 
    }      
    })
};

//module.export = {generateAccessToken};