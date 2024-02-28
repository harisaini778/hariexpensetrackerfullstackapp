// /controllers/expenseController

const path = require("path");
const Expense = require("../models/expenseModel");
const database = require("../utils/database");
const User = require("../models/userModels");
const sequelize = require("../utils/database");

exports.getHomePage = (req,res,next) => {
    try {
        res.sendFile(path.join(__dirname,"../","public","views","homePage.html"));
    } catch {
        (err)=> console.log(err);
    }

}

exports.addExpense = async (req,res,next) => { 
    const date = req.body.date;
    const category  = req.body.category;
    const description = req.body.description;
    const amount = req.body.amount;

    User.update({
        totalExpenses:req.user.totalExpenses + amount,
    },{
        where : {id : req.user.id}
    });

 


    Expense.create({
        date :  date,
        category : category,
        description :  description,
        amount : amount,
        userId : req.user.id,
    })
    .then((result)=>{
        res.status(200);
        res.redirect("/homePage");
    })
    .catch((err)=>console.log(err));
};

exports.getAllExpenses = (req,res,next) => {
     Expense.findAll({where : {userId:req.user.id}})
     .then((expenses)=>{
        res.json(expenses)
     })
     .catch((err)=>{
        console.log(err);
     })
};

exports.deleteExpenses = (req,res,next) =>{

    const id = req.params.id;

    console.log("this is req.body in exoenseControllers : ",req.body);

    Expense.findByPk(id).then((expense)=>{
    User.update({
        totalExpenses : req.user.totalExpenses - expense.amount,
    },{
        where : {id : req.user.id}
    })
    });

    console.log("Delete expense id : ",id);

    Expense.destroy({where : {id:id,userId:req.user.id}})
    .then((result)=>{
        console.log(result);
        res.redirect("/homePage");
    })
    .catch((err)=>{
        console.log(err);
    })

}


exports.editExpenses = (req,res,next) =>{
    
    const id = req.params.id;

    console.log("Edit Expense api req.body is : ",req.body);

    const category = req.body.category;
    const description = req.body.description;
    const amount =  req.body.amount;

    console.log("Category from edit API: "+category+" Description: "+description+ " Amount: "+amount);

    Expense.findByPk(id).then((expense)=>{
        User.update({
            totalExpenses : req.user.totalExpenses - expense.amount + amount,
        },{
            where : {id : req.user.id}
        });
    });

    Expense.update({

        category:category,
        description: description,
        amount : amount
    },
    {
        where :  {id : id, userId:req.user.id}
    })
    .then((result)=>{
        res.redirect("/homePage");
    })
    .catch((err)=>console.log(err));
};