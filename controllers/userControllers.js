const path = require("path");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../utils/database");
const Sib = require("sib-api-v3-sdk");

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

    try {
    
        if(req.user.isPremiumUser) {

        return res.json({isPremiumUser : true})

        }

    }
     catch (err)  {
 
    console.log(err);

    }
}

// function redirectToHomepage(res) {
//  res.redirect("/homePage");
// }

exports.getLoginPage = (req, res, next) => {

    try {

    res.sendFile(path.join(__dirname, "../", "public", "views", "login.html"));

    } catch (err) {

        console.log(err);

    }
  
};

exports.postUserSignUp = async (req, res, next) => {

    try {

        const name = req.body.name;

        const email = req.body.email;
    
        const password = req.body.password;

       await  User.findOne({ where: { email: email } })
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
            window.location.href='/';
        })
    
        
    } catch (err) {
   
        console.log(err);

    }
};

exports.postUserLogin = async  (req,res,next) => {

    try {

        const email = req.body.loginEmail;

        const password = req.body.loginPassword;

        await User.findOne({where:{email:email}})
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
   } catch (err) {
      console.log(err);
   }
};

exports.getAllUsers =  async (req, res, next) => {

    try {

    await User.findAll({
        attributes: [
          [sequelize.col("name"), "name"],
          [sequelize.col("totalExpenses"), "totalExpenses"],
        ],
        order: [[sequelize.col("totalExpenses"), "DESC"]],
      }).then((users) => {
        const result = users.map((user) => ({
          name: user.getDataValue("name"),
          totalExpenses: user.getDataValue("totalExpenses"),
        }));
        res.send(JSON.stringify(result));
      });

    } catch (err) {
        console.log(err);
    }
    
  };


//   exports.resetPasswordPage = (req,res,next) => {

//     try {

//       res.
//       status(200)
//       .sendFile(
//         path.join(__dirname,"../","public","views","resetPassword.html")
//         );

//     } catch(err) {

//     console.log(err);

//     }
//   }


//   exports.sendMail = async(req,res,next) =>{

//   try {
 
//     const client = Sib.ApiClient.instance;
//     const apiKey = client.authentications["api-key"];
//     apiKey.apiKey = "xsmtpsib-a13188f46b350f7ecbbafff2163125b689b3c85cbc0f8ed1ea8bc0e66c0a0669-EMtO20JjLRfrNKTv";
//     const transEmailApi = new Sib.TransactionalEmailsApi();

//     const sender = {

//         email : "harisaini607@gmail.com",
//         name : "Hari",
//     };

//     const receivers = [

//         {
//             email : req.body.email,
//         }
//     ];

//     const emailResponse = await transEmailApi.sendTransacEmail({

//         sender,
//         To : receivers,
//         subject : "Expense Tracker Reset Password",
//         textContent : "Link Below",

//     });cfn                                                                                          v v

//     res.send(
//         `<script>
//         alert("Check your  Email for the reset password link");
//         </script>`
//     );
//     res.redirect("/");


//   } catch(error) {

//    console.log(error);

//   }

//   }
  

//module.export = {generateAccessToken};