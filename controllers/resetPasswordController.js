const path = require("path");

const User = require("../models/userModels");

const ResetPassword = require("../models/resetPasswordModel");

const bcrypt = require("bcrypt");

const Sib = require("sib-api-v3-sdk");

const {v4 : uuidv4} = require("uuid");

const saltRounds = 10;

const hashPassword = async (password) => {

  try {
 
    return await bcrypt.hash(password,saltRounds);


  } catch(err) {
    console.log(err);
  }


}

exports.forgotPasswordPage = async (req,res,next)=>{ 

    try {

    res
    .status(200)
    .sendFile(
        path.join(__dirname,"../","public","views","forgotPassword.html")
    );

    } catch (err) {

    console.log(err);

    }

}

exports.sendMail = async(req,res,next) => {

try {

const email = req.body.email;

const requestId = uuidv4();

const recepientEmail = await User.findOne({where : {email : email}});

if(!recepientEmail) {

    return res
    .status(404)
    .json({message : "Please provide the registered email !"});

}

const resetRequest = await ResetPassword.create({

    id : requestId,
    isActive : true,
    userId : recepientEmail.dataValues.id,

});

const client  = Sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];

apiKey.apiKey = "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"

const transEmailApi = new Sib.TransactionalEmailsApi();

const sender = {
    
    email : "harikumarsaini778@gmail.com",
    name : "Hari"
};

const receivers = [

    {

        email : email,
    }
]

const emailResponse = await transEmailApi.sendTransacEmail(

{

  sender,

  To : receivers,

  subject : "Expense Tracker Reset Password",

  textContent : "Link Below",

  htmlContent : `<h3>Hi! We got the request from you for reset the password. Here is the link below >>></h3>
  <a href="http://localhost:3000/password/resetPasswordPage/{{params.requestId}}"> Click Here</a>`,

  params : {

    requestId : requestId,

  },
    
}

);


return res.status(200).json({

    message : "Link for reset the password is successfully send on your Mail Id!"

})

} catch(err) {
    console.log(err);
    return res.status(400).json({message : "failed changing password"});
}

};


exports.resetPasswordPage = async (req, res, next) => {
    try {
      res
        .status(200)
        .sendFile(
          path.join(__dirname, "../", "public", "views", "resetPassword.html")
        );
    } catch (error) {
      console.log(error);
    }
  };

exports.updatePassword =  async (req,res,next) => {

 try {

    const requestId = req.headers.referer.split("/");

    const password = req.body.password;

    const checkResetRequest = await ResetPassword.findAll({

        where : { id : requestId[requestId.length - 1], isActive : true},

    });

    if(checkResetRequest[0]) {

        const userId = checkResetRequest[0].dataValues.userId;

        const result = await ResetPassword.update (

            {isActive :  false },
            {where : {id : requestId}}
        );

        const newPassword = await hashPassword(password);

        const user = await User.update (
            
            {password:newPassword},
            
            {where:{id : userId}}
            
            ) ;

            return res
            .status(200)
            .json({message:"Password Updated Successfully"});

    } else {

        return res
        .status(409)
        .json({message : "Link is already usesd once, Request for a new link!"})
    }


  } catch (err) {

    console.log(err);

    res.status(409).json({message : "Failed to change  password! Please try again later."});
  }

};


