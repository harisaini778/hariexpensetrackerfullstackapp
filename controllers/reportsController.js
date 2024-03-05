// controllers/reportsController

const path = require("path");
const Expense = require("../models/expenseModel");
const {Op} =  require("sequelize");


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