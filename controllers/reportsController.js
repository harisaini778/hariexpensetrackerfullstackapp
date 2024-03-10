// controllers/reportsController

const path = require("path");
const Expense = require("../models/expenseModel");
const {Op} =  require("sequelize");
require("dotenv").config();
const AWS = require("aws-sdk");
const CreditExpense = require("../models/creditExpenseModel");
const User = require("../models/userModels");
const downloadHistory = require("../models/downloadHistoryModel");



exports.getReportsPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "public", "views", "reports.html"));
};


// exports.dailyReport = async (req,res,next) => {


//   try {

//     const date = req.body.date; // 2023-05-03 

//     console.log("Date in dailyReport server side : ",date);

//     console.log("User id in dailyReport server side : ",req.user.id);

//     const expenses = await Expense.findAll({
//       where : {date : date,userId : req.user.id},
//     });


//     const expenses2 = await Expense.findAll({
//       where : {date : date},
//     }); 

//     console.log("Expenses in dailyReports fn  server side : ",expenses);

    
//     console.log("Expenses in dailyReports fn  server side : ",expenses2);
    

//   return res.send(expenses);

//   } catch (err) {
     
//      console.log(err);

//   }

// };


exports.dailyReport = async (req,res,next) => {

try{

  const date = req.body.date;

  const expenses = await Expense.findAll({
    where : {date :  date, userId : req.user.id}
  });

  return res.send(expenses)

}catch (error) {

  console.log(error);

}


}



exports.monthlyReport = async (req, res, next) => {
  try {
    const month = req.body.month;

    const expenses = await Expense.findAll({
      where: {
        date: {
          [Op.like]: `%-${month}-%`,
        },
        userId: req.user.id,
      },
      raw: true,
    });

    return res.send(expenses);
  } catch (error) {
    console.log(error);
  }
};


exports.yearlyReport = async (req,res,next) => {


  try {

  const year = req.body.year;

  const expenses = await Expense.findAll({
    where: {
      date: {
        [Op.like]: `%-${year}-%`,
      },
      userId: req.user.id,
    },
    raw: true,
  });

  return res.send(expenses);

  } catch (err) {

  console.log(err);

  }
 
};

const uploadToS3 =  (data,filename) => {

  const BUCKET_NAME = process.env.BUCKET_NAME;
  const IAM_USER_KEY = process.env.IAM_USER_KEY;
  const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
  const REGION = process.env.REGION;

  // const BUCKET_NAME = "expensetracker12911" ;
  // const IAM_USER_KEY = "AKIA3FLD4SX5RHHYCOPC";
  // const IAM_USER_SECRET = "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";
  // const REGION = "us-east-1";
  
  console.log("AWS Credentials:", { IAM_USER_KEY, IAM_USER_SECRET });
  console.log("Bucket Name:", BUCKET_NAME);

  AWS.config.update({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      region:REGION,
  });
  
  const s3bucket = new AWS.S3({params : {Bucket : BUCKET_NAME}});
  
  const params ={
      Bucket : BUCKET_NAME,
      Key : filename,
      Body : data,
  };


  console.log("Upload Params:", params);


  s3bucket.upload(params,(err,s3respone) => {
      if(err){
          console.log("Something went wrong." ,err);
      } else {
          console.log("File uploaded successfully.",s3respone,s3respone.Location);
          console.log("File url is : ",s3respone.Location);
      }
  });
  };
  
  exports.downloadExpenseReport = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const user = await User.findOne({
        where: { id: userId },
      });
  
      const expenses = await Expense.findAll({
        where: { userId: userId },
      });
  
      const credits = await CreditExpense.findAll({
        where: { userId: userId },
      });
  
      let totalIncome = 0;
  
      credits.forEach((credit) => {
        totalIncome += credit.totalIncome;
      });
  
      const totalExpenses = user.totalExpenses;
  
      const savings = totalIncome - totalExpenses;
  
      let csv = `Date,Category,Description,Amount\n`;
  
      expenses.forEach((expense) => {
        csv += `${expense.date},${expense.category},${expense.description},${expense.amount}\n`;
      });
  
      csv += `\nTotal Income,,,${totalIncome}\n`;
      csv += `Total Expenses,,,${totalExpenses}\n`;
      csv += `Savings,,,${savings}\n`;
  
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment;filename=ExpenseReport.csv");
      res.status(200).send(csv);
  
      const filename = `${userId}_ExpenseReport.csv`;

     uploadToS3(csv, filename) ;

     console.log("response in the the download Expense button : ", res);

     

    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, error: "Error downloading expenses" });
    }
  };
  

  

exports.userDownloadHistory = async (req,res) =>{

   try {

    let userId = req.user.id;

    console.log("in the userDownnloadHistory function server side user id is : ",userId);

    let date = req.body.date;

    console.log("in the userDownnloadHistory function server side date is : ",date);

   const historyData =  await downloadHistory.create({
        date : date,
        userId : userId,
        fileUrl: `https://expensetracker12911.s3.amazonaws.com/${userId}_ExpenseReport.csv`, 
    });

    console.log("historyData from the table is : ",historyData);

    res.status(200).json({ success: true, data: historyData });


   } catch(err) {

   console.log(err);
   res.status(500).json({ success: false, error: "Error fetching download history" });

   }

}

exports.getDownloadHistory = async (req,res)=>{

try {

 const userId = req.user.id;

 const downloadHistoryData = await downloadHistory.findAll({
  where : {userId : req.user.id}
 });

 console.log("history data from the database is : ",downloadHistoryData);

 res.json(downloadHistoryData);


} catch (err) {

  console.log(err);

}

}

